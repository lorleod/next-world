import "../App.scss";
import "./AddWorld.scss";
import { useState } from "react";
import SearchBar from "./partials/SearchBar";
import Api from "../api/Api";
import WorldList from "./partials/WorldList";

function AddWorld() {
  const [state, setState] = useState({
    results: [],
  });

  const onSearch = async (text) => {
    const results = await Api.get("/", {
      params: { q: text },
    });
    //console.log("addworld", results);

    setState((prevState) => {
      return { ...prevState, results: results };
    });
  };
  //console.log("state results", state.results);
  //  `https://api.tvmaze.com/search/shows?q=${}`
  return (
    <div className="App">
      <h1>Add World</h1>
      <SearchBar onSearch={onSearch} />
      <WorldList results={state.results} />
    </div>
  );
}

export default AddWorld;
