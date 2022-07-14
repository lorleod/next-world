import "../App.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserPlaylists from "./partials/UserPlaylists";
import UserFavourites from "./partials/UserFavourites";
const Cookies = require("js-cookie");

let token = Cookies.get("jwt");

function UserDashboard() {
  const [username, setUsername] = useState("");
  const [playlists, setPlaylists] = useState();
  const [favourites, setFavourites] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/user/${token}`, {
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

  useEffect(() => {
    const fetchData = async () => {
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
  }, []);
  // console.log("user playllists", playlists);
  return (
    <div className="App">
      <h1>{username}</h1>
      <h2>
        My Playlists
        <UserPlaylists props={playlists} />
      </h2>
      <h2>
        My Favourites
        <UserFavourites props={favourites} />
      </h2>
      <Link to="/playlist/create">Create Playlist</Link>
    </div>
  );
}

export default UserDashboard;
