import "../../App.scss";
import { Link } from "react-router-dom";
import axios from "axios";

function Nav() {
  const logout = async () => {
    await axios.get("http://localhost:3001/user/logout");
  };
  return (
    <nav>
      <h3>
        <Link to="/">NextWorld</Link>
      </h3>
      <ul className="nav-links">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
        <li>

          <a href="/addworld">Search</a>
        </li>
        <li>
          <a href="/userDashboard">Dashboard</a>
        </li>
        <li>
          <a href="/create">Create a Playlist</a>

          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/addworld">Add world</Link>

        </li>
      </ul>
    </nav>
  );
}

export default Nav;
