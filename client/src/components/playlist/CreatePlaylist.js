import "../../App.scss";
import "./createPlaylist.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

//Page to collect new playlist info and submit
function CreatePlaylist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  //submit form info to backend when triggered by user
  const submit = async (event) => {
    event.preventDefault();

    //get encoded jwt cookie containing user id for assigning owner of playlist
    let token = Cookies.get("jwt");

    // post create playlist request to backend
    await axios.post(
        "/api/playlist/create",
        {
          title: title,
          description: description,
          token: token,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((response) => {
        //if successful, alert user then redirect back to playlist
        let data = response.data;
        if (data) {
          alert("Playlist Created");
          navigate(`/playlist/${data}`);
        } else {
          alert("Playlist creation unscuccessful");
        }
      }).catch((error) => {
        console.log("error:", error)
      });
  };
  return (
    <div className="create-playlist-container">
      <h1 className="create-playlist-heading">Create Playlist</h1>
      <form>
        <br />
        <input
          className="create-playlist-title"
          type="text"
          placeholder="Title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <br />
        <input
          className="create-playlist-description"
          type="text"
          size="60"
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></input>
        <br />
        <button className="create-playlist-create-button" onClick={submit}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreatePlaylist;
