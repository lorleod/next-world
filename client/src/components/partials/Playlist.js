import World from "./World";
import WorldExpanded from "./WorldExpanded";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Playlist({ results }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  const playlistId = params.id;

  axios.get(`http://localhost:3001/playlist/${playlistId}`).then((response) => {
    setTitle(response.data.title);
    setDescription(response.data.description);
  });

  return (
    <div className="result">
      <h1>{title}</h1>
      <h2>{description}</h2>
      <h3>
        <Link to="/addworld">Add World</Link>
      </h3>
    </div>
  );
}

export default Playlist;
