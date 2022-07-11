import "../App.scss";
import "./AddWorld.scss";
import { useState } from "react";
import SearchBar from "./partials/SearchBar";
import Api from "../api/Api";
import WorldList from "./partials/WorldList";

function AddWorld() {
  //Creates state and sets to empty array
  const [state, setState] = useState({
    results: [],
  });

  //Takes input field and adds submit to API url
  const onSearch = async (text) => {
    const results = await Api.get("/", {
      params: { q: text },
    });

    setState((prevState) => {
      return { ...prevState, results: results };
    });
  };

  return (
    <div className="App">
      <h1>Add World</h1>
      <SearchBar onSearch={onSearch} />
      <WorldList results={state.results} />
    </div>
  );
}

export default AddWorld;
