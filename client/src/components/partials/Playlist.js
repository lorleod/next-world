import World from "./World";
import WorldExpanded from "./WorldExpanded";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import WorldPlaylist from "./WorldPlaylist";

function Playlist({ results }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [worlds, setWorlds] = useState([]);
  const [edit, setEdit] = useState(false);
  const params = useParams();
  const addWorldUrl = `/playlist/${params.id}/addworld`;

  useEffect(() => {
    const playlistId = params.id;
    axios
      .get(`http://localhost:3001/playlist/${playlistId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setWorlds(response.data.worldIds);
      });
  }, []);

  const EditPlaylist = () => {
    setEdit(true);
  };
  // console.log("worlds: ", worlds);
  return (
    <div>
      {edit ? (
        <div className="result">
          <h1>{title}</h1>
          <h2>{description}</h2>
          <button onClick={EditPlaylist}>Edit Playlist</button>
          <div></div>

          <WorldPlaylist props={worlds} />
          <h3>
            <Link to={addWorldUrl}>Add World</Link>
          </h3>
        </div>
      ) : (
        <div className="result">
          <h1>{title}</h1>
          <h2>{description}</h2>
          <button onClick={EditPlaylist}>Edit Playlist</button>
          <div></div>

          <WorldPlaylist props={worlds} />
          <h3>
            <Link to={addWorldUrl}>Add World</Link>
          </h3>
        </div>
      )}
    </div>
  );
}

export default Playlist;
