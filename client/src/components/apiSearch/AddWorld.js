import "../../App.scss";
import "./AddWorld.scss";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import WorldList from "../partials/WorldList";
import axios from "axios";

// Page to seach and add world to a playlist
function AddWorld() {
  const params = useParams();
  const playlistId = params.id;
  const playlistUrl = `/playlist/${playlistId}`;
  const [state, setState] = useState({
    results: [],
  });

  //Takes input field and adds submit to API url
  const onSearch = async (text) => {
    const response = await axios.post("/api/getWorld", { text: text })
      .then((response) => {
        return response;
      }).catch((error) => {
        console.log("error:", error)
      });

    setState((prevState) => {
      return { ...prevState, results: response };
    });
  };

  return (
    <div className="add-world-container">
      <h1 className="add-world-heading">Add World</h1>
      <Link className="add-world-back-playlist-button" to={playlistUrl}>
        Back to Playlist
      </Link>
      <SearchBar onSearch={onSearch} />
      <WorldList results={state.results} playlistId={playlistId} />
    </div>
  );
}

export default AddWorld;
