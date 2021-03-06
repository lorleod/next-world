import "./playlist.scss";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import PlaylistItem from "./PlaylistItem";
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
  const [popupDelete, setPopupDelete] = useState(false);
  const [popupShared, setPopupShared] = useState(false);
  const [inFavourites, setInFavourites] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [deleteWorldTrigger, setDeleteWorldTrigger] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const addWorldUrl = `/playlist/${params.id}/addworld`;
  const playlistId = params.id;
  let token = Cookies.get("jwt");

  // Get playlist info
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/playlist/${playlistId}`)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setWorlds(response.data.worldIds);
          setPlaylistUserId(response.data.user_id);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    };
    fetchData();
  }, [deleteWorldTrigger]);

  // Get user info
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/playlist/auth/${token}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    };
    fetchData();
  }, []);

  // Get playlist favourite count
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/favourites/count/${playlistId}`)
        .then((response) => {
          setFavourites(response.data.length);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    };
    fetchData();
  }, [trigger]);

  // Authenticate user to show edit if user is owner
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/api/playlist/auth/${token}/${playlistId}`)
        .then((response) => {
          const auth = response.data;
          if (auth === "Authorized") {
            setEdit(true);
          } else {
            setEdit(false);
          }
        })
        .catch((error) => {
          console.log("error:", error);
        });
    };
    fetchData();
  }, []);

  // Check if user already favourited playlist
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/api/favourites/check/${token}/${playlistId}`)
        .then((response) => {
          if (response.data.length > 0) {
            setInFavourites(true);
          } else {
            setInFavourites(false);
          }
        })
        .catch((error) => {
          console.log("error:", error);
        });
    };
    fetchData();
  }, [trigger]);

  const confirm = (event) => {
    let confirm = window.confirm("Confirm edits");
    event.preventDefault();
    if (confirm) {
      axios
        .post(
          "/api/playlist/edit",
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
            setEditInfo(false);
            navigate(`/playlist/${playlistId}`);
          } else {
            alert("Playlist creation unscuccessful");
          }
        })
        .catch((error) => {
          console.log("error:", error);
        });
    }
  };

  const favourite = () => {
    axios
      .post(`/api/favourites/${token}/${playlistId}`)
      .then((response) => {
        setPopupFavourite(true);
        setTrigger(true);
        setInterval(() => {
          setTrigger(false);
        }, 10);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const removeFavourite = () => {
    axios
      .delete(`/api/favourites/delete/${token}/${playlistId}`)
      .then((response) => {
        setPopupRemoveFavourite(true);
        setTrigger(true);
        setInterval(() => {
          setTrigger(false);
        }, 10);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  // copies the current playlist url to user's clipboard
  const copyToClipboard = async () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/playlist/${playlistId}`
    );
    setPopupShared(true);
  };

  const editPlaylistInfo = async () => {
    setEditInfo(true);
  };

  const deleteWorldRefresh = async (event) => {
    setDeleteWorldTrigger(event);
    setPopupDelete(event);
    setInterval(() => {
      setDeleteWorldTrigger(false);
    }, 10);
  };

  const worldPlayist = worlds.map((worldId, index) => {
    let key = worldId.concat(index);
    return (
      <PlaylistItem
        key={key}
        worldId={worldId}
        edit={edit}
        deleteWorldRefresh={deleteWorldRefresh}
      />
    );
  });

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
          <div className="playlist-world-container">{worldPlayist}</div>
        </div>
      ) : (
        <div className="result">
          {editInfo ? (
            <div>
              <form>
                <input
                  className="create-playlist-title"
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                ></input>
                <br />
                <input
                  className="create-playlist-description"
                  type="text"
                  placeholder="description"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></input>
              </form>
              <button
                className="create-playlist-create-button"
                onClick={confirm}
              >
                Confirm
              </button>
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
              <div>
                <Link className="playlist-page-playlist-add" to={addWorldUrl}>
                  Add World
                </Link>
              </div>
            </div>
          )}
          <div className="playlist-world-container">{worldPlayist}</div>
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
      <BasicPopup trigger={popupShared} setTrigger={setPopupShared}>
        <h1>Link Copied to Clipboard</h1>
      </BasicPopup>
      <BasicPopup trigger={popupDelete} setTrigger={setPopupDelete}>
        <h1>World Deleted</h1>
      </BasicPopup>
    </div>
  );
}

export default Playlist;
