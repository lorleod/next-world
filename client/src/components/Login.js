import "../App.scss";
import "./login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import RedirectPopup from "./partials/popups/RedirectPopup";
import BasicPopup from "./partials/popups/BasicPopup";
import Nav from "./partials/Nav";

// user login page
function Login({ checkLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popupLoginSuccess, setPopupLoginSuccess] = useState(false);
  const [popupLoginError, setPopupLoginError] = useState(false);
  const [user, setUser] = useState(false);
  const redirectUrl = "/user";
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const response = axios
      .post(
        "/api/user/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((response) => {
        const data = response.data;
        console.log("data", response);

        if (data.user) {
          Cookies.set("jwt", data.user, { expires: 7 });
          // setPopupLoginSuccess(true);
          checkLogin(data.user);
          navigate("/user");
        } else {
          setPopupLoginError(true);
        }
      })
      .catch((error) => {});
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
              type="text"
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
      <RedirectPopup
        trigger={popupLoginSuccess}
        setTrigger={setPopupLoginSuccess}
        redirectUrl={redirectUrl}
      >
        <h1>Login Successful</h1>
      </RedirectPopup>
      <BasicPopup trigger={popupLoginError} setTrigger={setPopupLoginError}>
        <h1>Login Unsuccessful </h1>
      </BasicPopup>
    </div>
  );
}

export default Login;
