import "../App.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserPlaylists from "./partials/UserPlaylists";

function UserDashboard() {
  const [username, setUsername] = useState("");
  const [playlists, setPlaylists] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/user`, {
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
  // console.log("user playllists", playlists);
  return (
    <div className="App">
      <h1>{username}</h1>
      <UserPlaylists props={playlists} />
      <Link to="/playlist/create">Create Playlist</Link>
    </div>
  );
}

export default UserDashboard;
