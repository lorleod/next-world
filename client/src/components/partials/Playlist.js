import "./playlist.scss";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import WorldPlaylist from "./WorldPlaylist";
import FavouriteAddPopup from "./popups/FavouriteAddPopup";
import SharedPopup from "./popups/SharedPopup";

function Playlist({ results }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [worlds, setWorlds] = useState([]);
  const [edit, setEdit] = useState(false);
  const [playlistUserId, setPlaylistUserId] = useState("");
  const [user, setUser] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [popupFavourite, setPopupFavourite] = useState(false);
  const [popupShared, setPopupShared] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const params = useParams();
  const addWorldUrl = `/playlist/${params.id}/addworld`;
  const playlistId = params.id;
  let token = Cookies.get("jwt");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/playlist/${playlistId}`)
        .then((response) => {
          setTitle(response.data.title);
          console.log("response.data.title: ", response.data.title);
          setDescription(response.data.description);
          console.log("response.data.description: ", response.data.description);
          setWorlds(response.data.worldIds);
          setPlaylistUserId(response.data.user_id);
          // console.log("playist information", response.data);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/playlist/auth/${token}`)
        .then((response) => {
          setUser(response.data);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/favourites/count/${playlistId}`)
        .then((response) => {
          setFavourites(response.data.length);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/playlist/auth/${token}/${params.id}`)
        .then((response) => {
          const auth = response.data;
          console.log("auth: ", auth);
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

  const confirm = async (event) => {
    let confirm = window.confirm("Confirm edits");
    event.preventDefault();
    if (confirm) {
      await axios
        .post(
          "http://localhost:3001/playlist/edit",
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
    await axios
      .post(`http://localhost:3001/favourites/${token}/${playlistId}`)
      .then((response) => {
        setPopupFavourite(true);
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
            <button className="playlist-page-playlist-fav" onClick={favourite}>
              <i className="bi bi-heart">Favourite</i>
            </button>
            <button className="playlist-page-playlist-share"  onClick={copyToClipboard}>Copy Playlist Link to Clipboard</button>
          </div>

          <WorldPlaylist props={worlds} edit={edit} />
        </div>
      ) : (
        <div className="results">
          <form>
            <input
              className="playlist-page-edit-title"
              type="text"
              placeholder="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
            <br />
            <input
              className="playlist-page-edit-description"
              type="text"
              placeholder="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></input>
          </form>

          <div className="playlist-edit-buttons-container">
          {edit ? (
            <Link className="playlist-edit-page-add-world" to={addWorldUrl}>
              Add World
            </Link>
          ) : null}
          <button className="playlist-edit-page-confirm" onClick={confirm}>
            Confirm
          </button>
          </div>

          <WorldPlaylist props={worlds} edit={edit} />
        </div>
      )}
      <FavouriteAddPopup
        trigger={popupFavourite}
        setTrigger={setPopupFavourite}
      >
        <h1>Playlist Added to Favourites</h1>
      </FavouriteAddPopup>
      <SharedPopup trigger={popupShared} setTrigger={setPopupShared}>
        <h1>Link Copied to Clipboard</h1>
      </SharedPopup>
    </div>
  );
}

export default Playlist;
