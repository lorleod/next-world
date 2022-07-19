import "./world.scss";
import "./worldexpanded.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddSearchPopup from "../partials/popups/AddSearchPopup";
import { getLaunchLink } from "../../helpers/getLaunchLink.js";
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
        .get(`/api/user/${token}`, {
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

  const launchLink = () => {
    window.open(getLaunchLink(world_id));
  };
  return (
    <div className="world">
      <div>
        <h2 className="title">{world.name}</h2>
        <h3 className="author">Author: {world.authorName}</h3>

        <img className="img-world" src={world.imageUrl} />
      </div>{" "}
      <button className="add-button" onClick={addSearch}>
        Add to Playlist
      </button>
      <button className="launch-button" onClick={launchLink}>
        Launch Link
      </button>
      <div className="desc-title">
        <span>Description</span>
      </div>
      <div className="world-description">
        <p className="desc-text">{world.description}</p>
      </div>
      <div className="vr-stats">
        <h4 className="stats-title">Stats From VRChat</h4>
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
