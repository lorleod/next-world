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
  const params = useParams();
  const addWorldUrl = `/playlist/${params.id}/addworld`;
  const playlistId = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/playlist/${playlistId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setWorlds(response.data.worldIds);
      });
  }, []);

  const confirm = async (event) => {
    let confirm = window.confirm("Confirm edits");
    event.preventDefault();
    // console.log(username + password);

    //get coded jwt cookie containing user id
    let token = Cookies.get("jwt");
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
          console.log("data at createplaylist", data);
          if (data) {
            window.location.href = `/playlist/${playlistId}`;
          } else {
            alert("Playlist creation unscuccessful");
          }
        });
    }
  };

  const EditPlaylist = () => {
    setEdit(true);
  };
  return (
    <div>
      {!edit ? (
        <div className="result">
          <h1>{title}</h1>
          <h2>{description}</h2>
          <button onClick={EditPlaylist}>Edit Playlist</button>
          <div></div>

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
