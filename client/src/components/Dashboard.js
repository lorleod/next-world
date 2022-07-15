import "../App.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MyPlaylists from "./partials/MyPlaylists";
import UserFavourites from "./partials/UserFavourites";
const Cookies = require("js-cookie");

// page shows logged-in user dashboard: playlists they created and
// playlists they favorited. Create new playlist option and delete options
function Dashboard() {
  const [username, setUsername] = useState("");
  const [playlists, setPlaylists] = useState();
  const [favourites, setFavourites] = useState();

  // get user token from session
  let token = Cookies.get("jwt");

  // on page load:
  useEffect(() => {
    const fetchData = async () => {
      // GET request to user/:token returns the user and user's playlists
      await axios.get(`http://localhost:3001/user/${token}`, {
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
      await axios.get(`http://localhost:3001/favourites/${token}`, {
          withCredentials: true,
        })
        .then((response) => {
          setFavourites(response.data);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>{username}</h1>
      <Link to="/playlist/create">Create New Playlist</Link>
      <h2>My Playlists</h2>
      <MyPlaylists key="1" playlists={playlists} />
      <h2>My Favourites</h2>
      <UserFavourites key="2" props={favourites} />
    </div>
  );
}

export default Dashboard;
