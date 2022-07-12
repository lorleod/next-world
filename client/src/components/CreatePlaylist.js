import {useState} from 'react';
import axios from "axios";


function CreatePlaylist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    // console.log(username + password);
    const response = await axios.post(
      "http://localhost:3001/playlist/create",
      {
        title: title,
        description: description,
      },
      { withCredentials: true, credentials: "include" }
    );
    let data = response.data;
    if (data) {
      alert("Playlist Created");
      window.location.href = "/playlist/:id";
    } else {
      alert("Playlist creation unscuccessful");
    }
  };
  return (
    <div className="App">
      <h1>Create Playlist</h1>
      <form>
        <input
          type="text"
          placeholder="title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="descrition"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></input>
        <button onClick={submit}>Create</button>
      </form>
    </div>
  );
}

export default CreatePlaylist;