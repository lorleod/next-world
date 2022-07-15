import "../App.scss";
import "./AddWorld.scss";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "./partials/SearchBar";
import WorldList from "./partials/WorldList";
import axios from "axios";

function AddWorld() {
  const params = useParams();
  const playlistId = params.id;
  const playlistUrl = `/playlist/${playlistId}`;
  const [state, setState] = useState({
    results: [],
  });

  //Takes input field and adds submit to API url
  const onSearch = async (text) => {
    const response = await axios
      .post("http://localhost:3001/api/getWorld", { text: text })
      .then((response) => {
        // console.log("addWorld search results: ", response.data);
        // const results = response.data
        return response;
      });

    setState((prevState) => {
      return { ...prevState, results: response };
    });
  };

  return (
    <div className="add-world-container">
      <h1 className="add-world-heading">Add World</h1>
      <Link className="add-world-back-playlist-button" to={playlistUrl}>Back to Playlist</Link>
      <SearchBar onSearch={onSearch} />
      <WorldList results={state.results} playlistId={playlistId}/>
    </div>
  );
}

export default AddWorld;
