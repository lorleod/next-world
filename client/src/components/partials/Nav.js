import "../../App.scss";
import "./Nav.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import RedirectPopup from "./popups/RedirectPopup";

function Nav({ userToken }) {
  const [user, setUser] = useState(false);
  const [popupLogoutSuccess, setPopupLogoutSuccess] = useState(false);
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

  console.log("userToken", userToken);

  // console.log("trigger from login", setUserSend);
  //Sends logout sumbit to backend to delete the cookies
  const logout = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "/user/logout",
      {},
      { withCredentials: true }
    );
    const data = response.data;

    if (data.message === "logout successful") {
      // setPopupLogoutSuccess(true);
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
          <Link className="nav-dashboard" to="/user">
            <li className="nav-link-item">Dashboard</li>
          </Link>
          <Link className="nav-search" to="/search">
            <li className="nav-link-item">Search</li>
          </Link>
          <Link className="nav-logout" onClick={logout} to="">
            <li className="nav-link-item">Logout</li>
          </Link>
        </ul>
      ) : null}
      <RedirectPopup
        trigger={popupLogoutSuccess}
        setTrigger={setPopupLogoutSuccess}
      >
        <h1>Logout Successful</h1>
      </RedirectPopup>
    </nav>
  );
}

export default Nav;
