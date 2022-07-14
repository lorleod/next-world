import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import WorldPlaylist from "./WorldPlaylist";

function Playlist({ results }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [worlds, setWorlds] = useState([]);
  const [edit, setEdit] = useState(false);
  const [playlistUserId, setPlaylistUserId] = useState("");
  const [user, setUser] = useState("");
  const params = useParams();
  const addWorldUrl = `/playlist/${params.id}/addworld`;
  const playlistId = params.id;
  let token = Cookies.get("jwt");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlist/${playlistId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setWorlds(response.data.worldIds);
        setPlaylistUserId(response.data.user_id);
        console.log("response", response);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlist/auth/${token}`)
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  const confirm = async (event) => {
    let confirm = window.confirm("Confirm edits");
    event.preventDefault();
    // console.log(username + password);

    //get coded jwt cookie containing user id

    // console.log("token", token);
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

  const editPlaylist = () => {
    if (user === playlistUserId) {
      setEdit(true);
    } else {
      alert("You do not have permission to edit this playlist");
    }
  };

  const favourite = async () => {
    await axios.post(`http://localhost:3001/favourites/${token}/${playlistId}`);
  };

  return (
    <div>
      {!edit ? (
        <div className="result">
          <h1>{title}</h1>
          <h3>Favourites: </h3>
          <h2>{description}</h2>
          <button onClick={editPlaylist}>Edit Playlist</button>
          <div>
            <button onClick={favourite}>
              <i className="bi bi-heart">Favourite</i>
            </button>
          </div>
          <WorldPlaylist props={worlds} edit={edit} />
          <h3>
            <Link to={addWorldUrl}>Add World</Link>
          </h3>
        </div>
      ) : (
        <div className="result">
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

          <WorldPlaylist props={worlds} edit={edit} />
          <h3>
            <Link to={addWorldUrl}>Add World</Link>
          </h3>
          <button onClick={confirm}>Confirm</button>
        </div>
      )}
    </div>
  );
}

export default Playlist;
