import "../App.scss";
import "./AddWorld.scss";
import { useState } from "react";
import SearchBar from "./partials/SearchBar";
import Api from "../api/Api";
import WorldList from "./partials/WorldList";
import axios from "axios";

function AddWorld() {
  //Creates state and sets to empty array
  const [state, setState] = useState({
    results: [],
  });

  //Takes input field and adds submit to API url
  const onSearch = async (text) => {
    const response = await axios.post("http://localhost:3001/api/getWorld", {text: text})
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
    <div className="App">
      <h1>Add World</h1>
      <SearchBar onSearch={onSearch} />
      <WorldList results={state.results} />
    </div>
  );
}

export default AddWorld;
