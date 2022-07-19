import "./world.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddSearchPopup from "../partials/popups/AddSearchPopup";
import Cookies from "js-cookie";

//Expanded view of world (more info) for playlist
function WorldExpanded() {
  const params = useParams();
  const world_id = params.id;
  const [world, setWorld] = useState({});
  const [popupAdded, setPopupAdded] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const token = Cookies.get("jwt");
  console.log("worldId: ", world_id);

  useEffect(() => {
    axios
      .get(`/api/getWorld/${world_id}`)
      .then((response) => {
        console.log("response.data: ", response.data);
        setWorld(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // GET request to user/:token returns the user and user's playlists
      await axios
        .get(`http://localhost:3001/user/${token}`, {
          withCredentials: true,
        })
        .then((response) => {
          setPlaylists(response.data.playlists);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  let tags = [];
  if (world.tags) {
    tags = world.tags;
  }
  const tagLI = tags

    .map((tag) => {
      console.log("tag: ", tag);
      return tag;
    })
    .join(", ");

  const addSearch = () => {
    setPopupAdded(true);
  };

  return (
    <div className="world">
      <div>
        <h2>{world.name}</h2>
        <h3>{world.authorName}</h3>
        <button className="search-world-add-button" onClick={addSearch}>
          Add to Playlist
        </button>
        <img className="img-world" src={world.imageUrl} />
      </div>
      <div className="world-desc">
        <p>{world.description}</p>
      </div>
      <div className="vr-stats">
        <h4>Stats From VRChat</h4>
        <ul>
          <li>publication Date: {world.publicationDate}</li>
          <li>Capacity: {world.capacity}</li>
          <li>Favourites: {world.favorites}</li>
          <li>Heat: {world.heat}</li>
          <li>Visibility: {world.releaseStatus}</li>
          <li>Visits: {world.visits}</li>
          <li>Version: {world.version}</li>
          <li>Tags: {tagLI}</li>
        </ul>
      </div>
      <AddSearchPopup
        trigger={popupAdded}
        setTrigger={setPopupAdded}
        worldId={world_id}
        worldTitle={world.name}
        playlists={playlists}
      ></AddSearchPopup>
    </div>
  );
}

export default WorldExpanded;
