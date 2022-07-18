import "./world.scss";
import "./worldList.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import BasicPopup from "../partials/popups/BasicPopup";
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
  console.log("params: ", params);
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

  const submit = (event) => {
    event.preventDefault();
    console.log("addworld submit");
    axios.post(
        "/api/playlist/addworld",
        {
          worldId: props.world.id,
          playlistId: playlistId,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((data) => {
        console.log("addworld .then");
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
        .get(`http://localhost:3001/api/getWorld/${props.world.id}`)
        .then((response) => {
          setPopupWorldInfo(true);
          setDescription(response.data.description);
        })
        .catch((error) => {});
    }
    fetchData();
  };

  const addSearch = () => {
    setPopupAdded(true);
  };
  return (
    <div className="playlist-world-item-container">
      <div className="playlist-world-wrapper" onClick={showWorldInfo}>
        <img className="playlist-world-item-img" src={props.image} />

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
      <BasicPopup trigger={popupWorldInfo} setTrigger={setPopupWorldInfo}>
        <img className="img-world" src={props.image} />
        <div className="search-world-info-container">
          <h2 className="search-world-title">{props.title}</h2>
          <h5 className="search-world-author">Author: {props.author}</h5>
          <div className="search-world-description">
            <p className="search-world-description-p">{description}</p>
          </div>
        </div>
      </BasicPopup>
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
