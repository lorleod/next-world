import "../../App.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Nav() {
  const [user, setUser] = useState(false);
  const cookie = Cookies.get();

  //Changes state if user is logged in
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
      alert("Logout successful");
      localStorage.setItem("isAuthenication", "false");
      window.location.href = "/login";
    } else {
      alert("Logout failed");
    }
  };

  return (
    <nav>
      <h3 id="header-logo">
        <Link className="header-logo-link" to="/">NextWorld</Link>
      </h3>
      {!user ? (
        <ul className="nav-links">
          <li id="nav-register-link">
            <Link className="nav-link-a" to="/register">
              Register
            </Link>
          </li>
          <li id="nav-login-link">
            <Link className="nav-link-a" to="/login">
              Login
            </Link>
          </li>
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
            <button className="nav-link-logout" onClick={logout}>Logout</button>
          </li>
        </ul>
      ) : null}
    </nav>
  );
}

export default Nav;
