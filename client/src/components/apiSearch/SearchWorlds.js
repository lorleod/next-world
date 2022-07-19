import "../../App.scss";
import "./AddWorld.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import World from "./World";
import axios from "axios";

// Page to seach and add world to a playlist
function SearchWorld() {
  let data = [];

  const [state, setState] = useState({
    results: [],
  });

  //Takes input field and adds submit to API url
  const onSearch = async (text) => {
    const response = await axios
      .post("/api/getWorld", { text: text })
      .then((response) => {
        return response;
      }).catch((error) => {
        console.log("error:", error)
      });

    setState((prevState) => {
      return { ...prevState, results: response };
    });
  };

  

  if (state.results.data) {
    data = state.results.data;
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
