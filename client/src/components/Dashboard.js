import "../App.scss";
import "./dashboard.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MyPlaylistsItem from "./partials/MyPlaylistsItem";
import MyFavouritesItem from "./partials/MyFavouritesItem";
import BasicPopup from "./partials/popups/BasicPopup";
const Cookies = require("js-cookie");

// page shows logged-in user dashboard: playlists they created and
// playlists they favorited. Create new playlist option and delete options
function UserDashboard(props) {
  const [username, setUsername] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [triggerFavouriteRefresh, setTriggerFavouriteRefresh] = useState(false);
  const [triggerFavouritePopup, setTriggerFavouritePopup] = useState(false);
  const [triggerDeleteRefresh, setTriggerDeleteRefresh] = useState(false);
  const [triggerDeletePopup, setTriggerDeletePopup] = useState(false);
  // console.log(MyFavouritesItem);
  // get user token from session
  let token = Cookies.get("jwt");

  // on page load:
  useEffect(() => {
    const fetchData = async () => {
      // GET request to user/:token returns the user and user's playlists
      await axios
        .get(`http://localhost:3001/user/${token}`, {
          withCredentials: true,
        })
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {});
    };
    fetchData();
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
  }, [triggerDeleteRefresh]);

  // on page load:
  useEffect(() => {
    const fetchData = async () => {
      // GET request to favourites/:token returns all favourite playlists for that user
      await axios
        .get(`http://localhost:3001/favourites/${token}`, {
          withCredentials: true,
        })
        .then((response) => {
          setFavourites(response.data);
        })
        .catch((error) => {});
    };
    fetchData();
  }, [triggerFavouriteRefresh]);

  const handleRemoveFavourite = (event) => {
    setTriggerFavouriteRefresh(event);
    setTriggerFavouritePopup(event);
    setInterval(() => {
      setTriggerFavouriteRefresh(false);
    }, 100);
  };

  const handleDeleteRefresh = (event) => {
    setTriggerDeleteRefresh(event);
    setTriggerDeletePopup(event);
    setInterval(() => {
      setTriggerDeleteRefresh(false);
    }, 100);
  };

  const mappedFavourites = favourites.map((favourite) => {
    return (
      <MyFavouritesItem
        key={favourite._id}
        playlistId={favourite.playlist_id}
        handleRemoveFavourite={handleRemoveFavourite}
      />
    );
  });

  const mappedPlaylists = playlists.map((playlist) => {
    return (
      <MyPlaylistsItem
        key={playlist._id}
        playlistId={playlist._id}
        handleDeleteRefresh={handleDeleteRefresh}
      />
    );
  });

  return (
    <div className="user-dashboard">
      <h1 className="dashboard-username">{username}</h1>
      <Link className="newplaylist-button" to="/playlist/create">
        Create New Playlist
      </Link>
      <div className="dashboard-container">
        <div className="dashboard-left">
          <h2 className="dashboard-heading">My Playlists</h2>
          <div className="dashboard-inner">{mappedPlaylists}</div>
        </div>
        <div className="dashboard-right">
          <h2 className="dashboard-heading">My Favourites</h2>
          <div className="dashboard-inner">{mappedFavourites}</div>
        </div>
      </div>
      <BasicPopup
        trigger={triggerDeletePopup}
        setTrigger={setTriggerDeletePopup}
      >
        <h1>Playlist Deleted</h1>
      </BasicPopup>
      <BasicPopup
        trigger={triggerFavouritePopup}
        setTrigger={setTriggerFavouritePopup}
      >
        <h1>Favourite Removed</h1>
      </BasicPopup>
    </div>
  );
}

export default UserDashboard;
