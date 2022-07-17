import "../App.scss";
import "./AddWorld.scss";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "./partials/SearchBar";
import WorldList from "./partials/WorldList";
import World from "./partials/World";
import axios from "axios";

// Page to seach and add world to a playlist
function SearchWorld() {
  const params = useParams();
  const playlistId = params.id;
  const playlistUrl = `/playlist/${playlistId}`;
  const [state, setState] = useState({
    results: [],
  });

  //Takes input field and adds submit to API url
  const onSearch = async (text) => {
    const response = await axios
      .post("/api/getWorld", { text: text })
      .then((response) => {
        // console.log("addWorld search results: ", response.data);
        // const results = response.data
        return response;
      });

    setState((prevState) => {
      return { ...prevState, results: response };
    });
  };
  let data = [];

  if (state.results.data) {
    data = state.results.data;
    console.log("data: ", data);
  }

  let worldList = data.map((item) => (
    <World
      key={item.id}
      world={item}
      title={item.name}
      image={item.thumbnailImageUrl}
      author={item.authorName}
    />
  ));

  return (
    <div className="add-world-container">
      <h1 className="add-world-heading">Search Worlds</h1>
      <SearchBar onSearch={onSearch} />
      <div className="result-worlds">{worldList}</div>
    </div>
  );
}

export default SearchWorld;
