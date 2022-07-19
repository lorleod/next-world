import "../../App.scss";
import "./Nav.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Nav({ userToken }) {
  const [user, setUser] = useState(false);
  const cookie = Cookies.get();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.jwt) {
      setUser(true);
    }
    if (userToken === {}) {
      setUser(true);
    }
  });

  //Sends logout sumbit to backend to delete the cookies
  const logout = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "/api/user/logout",
      {},
      { withCredentials: true }
    );
    const data = response.data;

    if (data.message === "logout successful") {
      setUser(false);
      navigate("/login");
    } else {
      alert("Logout failed");
    }
  };

  return (
    <nav>
      <h3 id="header-logo">
        <Link className="header-logo-link" to="/">
          NextWorld
        </Link>
      </h3>
      <h3 className="slogan">Discover New Realities!</h3>

      {!user ? (
        <ul className="nav-list">
          <Link className="nav-home" to="/">
            <li className="nav-link-item">Home</li>
          </Link>
          <Link className="nav-search" to="/search">
            <li className="nav-link-item">Search</li>
          </Link>
          <Link className="nav-register" to="/register">
            <li id="nav-link-item">Register</li>
          </Link>
          <Link className="nav-login" to="/login">
            <li id="nav-link-item">Login</li>
          </Link>
        </ul>
      ) : null}
      {user ? (
        <ul className="nav-list">
          <Link className="nav-home" to="/">
            <li className="nav-link-item">Home</li>
          </Link>
          <Link className="nav-search" to="/search">
            <li className="nav-link-item">Search</li>
          </Link>
          <Link className="nav-dashboard" to="/user">
            <li className="nav-link-item">Dashboard</li>
          </Link>

          <Link className="nav-logout" onClick={logout} to="">
            <li className="nav-link-item">Logout</li>
          </Link>
        </ul>
      ) : null}
    </nav>
  );
}

export default Nav;
