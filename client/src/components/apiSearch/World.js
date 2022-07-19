import "./world.scss";
import "./worldList.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import BasicPopup from "../partials/popups/BasicPopup";
import WorldCardPopup from "../partials/popups/WorldCardPopup";
import { useEffect, useState } from "react";
import AddSearchPopup from "../partials/popups/AddSearchPopup";
const Cookies = require("js-cookie");

function World(props) {
  const [popupAdded, setPopupAdded] = useState(false);
  const [popupAddedInPlaylist, setPopupAddedInPlaylist] = useState(false);
  const [popupWorldInfo, setPopupWorldInfo] = useState(false);
  const [description, setDescription] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [use, setUse] = useState();

  const params = useParams();
  const playlistId = params.id;
  let token = Cookies.get("jwt");

  useEffect(() => {
    if (Object.keys(params).length === 1) {
      return setUse(true);
    }
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
        .catch((error) => {console.log("error:", error)});
    };
    fetchData();
  }, []);

  const submit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/playlist/addworld",
        {
          worldId: props.world.id,
          playlistId: playlistId,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((data) => {
        if (data) {
          setPopupAddedInPlaylist(true);
        } else {
          alert("World add unsuccessful");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const showWorldInfo = () => {
    function fetchData() {
      axios
        .get(`/api/getWorld/${props.world.id}`)
        .then((response) => {
          setPopupWorldInfo(true);
          setDescription(response.data.description);
        })
        .catch((error) => {console.log("error:", error)});
    }
    fetchData();
  };

  const addSearch = () => {
    setPopupAdded(true);
  };
  return (
    <div className="playlist-world-item-container">
      <div className="playlist-world-wrapper" onClick={showWorldInfo}>
        <img className="playlist-world-item-img" src={props.image} alt={props.title}/>

        <h3 className="playlist-world-item-title">{props.title}</h3>
      </div>
      {use ? (
        <button className="search-world-add-button" onClick={submit}>
          Add
        </button>
      ) : (
        <button className="search-world-add-button" onClick={addSearch}>
          Add to Playlist
        </button>
      )}

      <BasicPopup
        trigger={popupAddedInPlaylist}
        setTrigger={setPopupAddedInPlaylist}
        setReload={false}
      >
        <h1>{props.title} Added to Playlist</h1>
      </BasicPopup>
      <WorldCardPopup
        trigger={popupWorldInfo}
        setTrigger={setPopupWorldInfo}
        world_id={props.world.id}
      >
        <img
          className="playlist-world-item-img"
          src={props.image}
          alt={props.title}
        />

        <h3 className="playlist-world-popup-title">{props.title}</h3>
        <h5 className="playlist-world-item-author">Author: {props.author}</h5>
        <div className="playlist-world-item-description">{description}</div>
      </WorldCardPopup>
      <AddSearchPopup
        trigger={popupAdded}
        setTrigger={setPopupAdded}
        worldId={props.world.id}
        worldTitle={props.title}
        playlists={playlists}
      ></AddSearchPopup>
    </div>
  );
}

export default World;
