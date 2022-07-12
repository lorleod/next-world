import "../../App.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function Nav() {
  const [user, setUser] = useState(true);
  const cookie = Cookies.get();

  useEffect(() => {
    if (cookie.jwt) {
      setUser(false);
    }
  });

  console.log("user", user);
  const logout = async (event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:3001/user/logout");
    const data = response.data;

    if (data.message === "logout successful") {
      alert("Logout successful");
      window.location.href = "/login";
    } else {
      alert("Logout failed");
    }
  };

  return (
    <nav>
      <h3>
        <Link to="/">NextWorld</Link>
      </h3>
      {user ? (
        <ul className="nav-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      ) : null}
      {!user ? (
        <ul className="nav-links">
          <li>
            <button onClick={logout}>Logout</button>
          </li>
          <li>
            <Link to="/addworld">Add world</Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
}

export default Nav;
