import "../App.scss";
import "./dashboard.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MyPlaylistsItem from "./partials/MyPlaylistsItem";
import MyFavourites from "./partials/MyFavourites";
import MyFavouritesItem from "./partials/MyFavouritesItem";
const Cookies = require("js-cookie");

// page shows logged-in user dashboard: playlists they created and
// playlists they favorited. Create new playlist option and delete options
function UserDashboard(props) {
  const [username, setUsername] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // get user token from session
  let token = Cookies.get("jwt");

  // on page load:
  useEffect(() => {
    const fetchData = async () => {
      // GET request to user/:token returns the user and user's playlists
      await axios
        .get(`/user/${token}`, {
          withCredentials: true,
        })
        .then((response) => {
          setUsername(response.data.username);
          setPlaylists(response.data.playlists);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  // on page load:
  useEffect(() => {
    const fetchData = async () => {
      // GET request to favourites/:token returns all favourite playlists for that user
      await axios
        .get(`/favourites/${token}`, {
          withCredentials: true,
        })
        .then((response) => {
          setFavourites(response.data);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);
  console.log("favourites: ", favourites);
  console.log("playlists: ", playlists);
  const mappedFavourites = favourites.map((favourite) => {
    return (
      <MyFavouritesItem
        key={favourite._id}
        playlistId={favourite.playlist_id}
      />
    );
  });

  const mappedPlaylists = playlists.map((playlist) => {
    return (
      <MyPlaylistsItem
        key={playlist._id}
        playlistTitle={playlist.title}
        playlistDesc={playlist.description}
        playlistId={playlist._id}
        authorId={playlist.user_id}
        worldIds={playlist.worldIds}
      />
    );
  });

  return (
    <div className="user-dashboard">
      <h1>{username}</h1>
      <Link to="/playlist/create">Create New Playlist</Link>
      <div className="dashboard-container">
        <div className="dashboard-left">
          <h2>My Playlists</h2>
          {mappedPlaylists}
        </div>
        <div className="dashboard-right">
          <h2>My Favourites</h2>
          {mappedFavourites}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
