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

  const share = async () => {
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
        <div className="result">
          <h1>{title}</h1>
          <h3>Favourites: {favourites}</h3>
          <h2>{description}</h2>

          <div>
            <button onClick={favourite}>
              <i className="bi bi-heart">Favourite</i>
            </button>
            <button onClick={share}>Share</button>
          </div>
          <WorldPlaylist props={worlds} edit={edit} />
        </div>
      ) : (
        <div className="result">
          {editInfo ? (
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
          ) : (
            <div>
              <h1>{title}</h1>
              <h3>Favourites: {favourites}</h3>
              <h2>{description}</h2>
              <button onClick={editPlaylistInfo}>Edit Playlist Info</button>
              <button onClick={favourite}>
                <i className="bi bi-heart">Favourite</i>
              </button>
            </div>
          )}

          <WorldPlaylist props={worlds} edit={edit} />
          {edit ? (
            <h3>
              <Link to={addWorldUrl}>Add World</Link>
            </h3>
          ) : null}
          <button onClick={confirm}>Confirm</button>
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
