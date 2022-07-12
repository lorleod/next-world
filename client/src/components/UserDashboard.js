import "../App.scss";
import { useEffect } from "react";
import {Link} from "react-router-dom";
// import jwt from "jsonwebtoken";

function UserDashboard() {

  return (
    <div className="App">
      <h1>Username</h1>
      <h2>Playlists</h2>
      <Link to="/playlist/create">Create Playlist</Link>
    </div>
  );
}

export default UserDashboard;
