import "../../App.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import RedirectPopup from "./popups/RedirectPopup";

function Nav() {
  const [user, setUser] = useState(false);
  const [popupLogoutSuccess, setPopupLogoutSuccess] = useState(false);
  const cookie = Cookies.get();
  const redirectUrl = "/login";
  useEffect(() => {
    if (cookie.jwt) {
      setUser(true);
    }
  });

  //Sends logout sumbit to backend to delete the cookies
  const logout = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:3001/user/logout",
      {},
      { withCredentials: true }
    );
    const data = response.data;

    if (data.message === "logout successful") {
      setPopupLogoutSuccess(true);
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
        <ul className="nav-links">
          <Link className="nav-link-a" to="/register">
            <li id="nav-register-link">Register</li>
          </Link>
          <Link className="nav-link-a" to="/login">
            <li id="nav-login-link">Login</li>
          </Link>
        </ul>
      ) : null}
      {user ? (
        <ul className="nav-links">
          <li id="nav-dashboard-link">
            <Link className="nav-link-a" to="/user">
              Dashboard
            </Link>
          </li>
          <li id="nav-logout-link">
            <button className="nav-link-logout" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      ) : null}
      <RedirectPopup
        trigger={popupLogoutSuccess}
        setTrigger={setPopupLogoutSuccess}
        redirectUrl={redirectUrl}
      >
        <h1>Logout Successful</h1>
      </RedirectPopup>
    </nav>
  );
}

export default Nav;
