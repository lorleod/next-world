import "./playlist.scss";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import WorldPlaylist from "./WorldPlaylist";
import BasicPopup from "../partials/popups/BasicPopup";

function Playlist(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [worlds, setWorlds] = useState([]);
  const [edit, setEdit] = useState(false);
  const [playlistUserId, setPlaylistUserId] = useState("");
  const [user, setUser] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [popupFavourite, setPopupFavourite] = useState(false);
  const [popupRemoveFavourite, setPopupRemoveFavourite] = useState(false);
  const [popupShared, setPopupShared] = useState(false);
  const [inFavourites, setInFavourites] = useState(false);
  const [editInfo, setEditInfo] = useState(false);

  const params = useParams();
  const addWorldUrl = `/playlist/${params.id}/addworld`;
  const playlistId = params.id;
  const [trigger, setTrigger] = useState(false);
  let token = Cookies.get("jwt");

  // Get playlist info
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/playlist/${playlistId}`).then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setWorlds(response.data.worldIds);
        setPlaylistUserId(response.data.user_id);
        // console.log("playist information", response.data);
      });
    };
    fetchData();
  }, []);

  // Get user info
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/playlist/auth/${token}`).then((response) => {
        setUser(response.data);
      });
    };
    fetchData();
  }, []);

  // Get playlist favourite count
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/favourites/count/${playlistId}`).then((response) => {
        console.log("favourite count", response.data);
        setFavourites(response.data.length);
      });
    };
    fetchData();
  }, [trigger]);

  // Authenticate user to show edit if user is owner
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/playlist/auth/${token}/${playlistId}`)
        .then((response) => {
          const auth = response.data;
          // console.log("auth: ", auth);
          if (auth === "Authorized") {
            setEdit(true);
          } else {
            setEdit(false);
          }
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  // Check if user already favourited playlist
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/favourites/check/${token}/${playlistId}`)
        .then((response) => {
          console.log(response.data.length);
          if (response.data.length > 0) {
            setInFavourites(true);
          } else {
            setInFavourites(false);
          }
        });
    };
    fetchData();
  }, [trigger]);

  const confirm = async (event) => {
    let confirm = window.confirm("Confirm edits");
    event.preventDefault();
    if (confirm) {
      await axios
        .post(
          "/playlist/edit",
          {
            title: title,
            description: description,
            token: token,
            playlistId: playlistId,
          },
          { withCredentials: true, credentials: "include" }
        )
        .then((response) => {
          let data = response.data;
          if (data) {
            window.location.href = `/playlist/${playlistId}`;
          } else {
            alert("Playlist creation unscuccessful");
          }
        });
    }
  };

  const favourite = async () => {
    await axios.post(`/favourites/${token}/${playlistId}`).then((response) => {
      setPopupFavourite(true);
      setTrigger(true);
      setInterval(() => {
        setTrigger(false);
      }, 10);
    });
  };

  const removeFavourite = async () => {
    await axios
      .delete(`/favourites/delete/${token}/${playlistId}`)
      .then((response) => {
        setPopupRemoveFavourite(true);
        setTrigger(true);
        setInterval(() => {
          setTrigger(false);
        }, 10);
      })
      .catch((error) => {});
  };

  // copies the current playlist url to user's clipboard
  const copyToClipboard = async () => {
    navigator.clipboard.writeText(`/playlist/${playlistId}`);
    setPopupShared(true);
  };

  const editPlaylistInfo = async () => {
    setEditInfo(true);
  };

  return (
    <div>
      {!edit ? (
        <div className="results">
          <h1 className="playlist-page-playlist-name">{title}</h1>
          <h5 className="playlist-page-playlist-favourites">
            Favourites: {favourites}
          </h5>
          <p className="playlist-page-playlist-description">{description}</p>

          <div>
            <button
              className="playlist-page-playlist-edit"
              onClick={editPlaylistInfo}
            >
              Edit Playlist
            </button>
            {!inFavourites ? (
              <button
                className="playlist-page-playlist-fav"
                onClick={favourite}
              >
                <i className="bi bi-heart">Favourite</i>
              </button>
            ) : (
              <button className="playlist-page-playlist-fav-selected">
                <i className="bi bi-heart-fill" onClick={removeFavourite}>
                  Favourite
                </i>
              </button>
            )}

            <button
              className="playlist-page-playlist-share"
              onClick={copyToClipboard}
            >
              Share
            </button>
          </div>

          <WorldPlaylist props={worlds} edit={edit} />
        </div>
      ) : (
        <div className="result">
          {editInfo ? (
            <div>
              <form>
                <input
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                ></input>
                <br />
                <input
                  type="text"
                  placeholder="description"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></input>
              </form>
              <button onClick={confirm}>Confirm</button>
            </div>
          ) : (
            <div>
              <h1 className="playlist-page-playlist-name">{title}</h1>
              <h5 className="playlist-page-playlist-favourites">
                Favourites: {favourites}
              </h5>
              <p className="playlist-page-playlist-description">
                {description}
              </p>
              <button
                className="playlist-page-playlist-edit"
                onClick={editPlaylistInfo}
              >
                Edit Playlist Info
              </button>
              {/* <button
                className="playlist-page-playlist-fav"
                onClick={favourite}
              >
                <i className="bi bi-heart">Favourite</i>
              </button> */}
              <button
                className="playlist-page-playlist-fav-selected"
                onClick={favourite}
              >
                <i className="bi bi-heart">Favourite</i>
              </button>
              <button
                className="playlist-page-playlist-share"
                onClick={copyToClipboard}
              >
                Share
              </button>
              <div>
                <Link className="playlist-page-playlist-add" to={addWorldUrl}>
                  Add World
                </Link>
              </div>
            </div>
          )}

          <WorldPlaylist props={worlds} edit={edit} />
        </div>
      )}
      <BasicPopup
        trigger={popupFavourite}
        setTrigger={setPopupFavourite}
        setReload={false}
      >
        <h1>Playlist Added to Favourites</h1>
      </BasicPopup>
      <BasicPopup
        trigger={popupRemoveFavourite}
        setTrigger={setPopupRemoveFavourite}
      >
        <h1>Playlist Removed from Favourites</h1>{" "}
      </BasicPopup>
      <BasicPopup
        trigger={popupShared}
        setTrigger={setPopupShared}
        setReload={false}
      >
        <h1>Link Copied to Clipboard</h1>
      </BasicPopup>
    </div>
  );
}

export default Playlist;
