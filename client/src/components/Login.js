import "../App.scss";
import "./login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import BasicPopup from "./partials/popups/BasicPopup";
import Nav from "./partials/Nav";

// user login page
function Login({ checkLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popupLoginError, setPopupLoginError] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    axios.post(
        "/api/user/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((response) => {
        const data = response.data;

        if (data.user) {
          Cookies.set("jwt", data.user, { expires: 7 });
          checkLogin(data.user);
          navigate("/user");
        } else {
          setPopupLoginError(true);
        }
      })
      .catch((error) => {
        console.log("error:", error)
      });
  };

  <Nav setUserSend={user} />;

  return (
    <div>
      <div id="login-page-container">
        <h1 id="login-page-heading">Login</h1>
        <div className="login-form-container">
          <form>
            <br />
            <input
              id="login-username-form"
              type="text"
              placeholder="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            ></input>
            <br />
            <input
              id="login-password-form"
              type="password"
              placeholder="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
            <br />
            <button className="login-button" onClick={submit}>
              Login
            </button>
          </form>
        </div>
      </div>
      <BasicPopup trigger={popupLoginError} setTrigger={setPopupLoginError}>
        <h1>Login Unsuccessful </h1>
      </BasicPopup>
    </div>
  );
}

export default Login;
