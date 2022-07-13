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
      <h3>
        <Link to="/">NextWorld</Link>
      </h3>
      {!user ? (
        <ul className="nav-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      ) : null}
      {user ? (
        <ul className="nav-links">
          <li>
            <button onClick={logout}>Logout</button>
          </li>
          <li>
            <Link to="/user">Dashboard</Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
}

export default Nav;
