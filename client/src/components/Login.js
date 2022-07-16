import "../App.scss";
import "./login.scss";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import RedirectPopup from "./partials/popups/RedirectPopup";
import BasicPopup from "./partials/popups/BasicPopup";

// user login page
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popupLoginSuccess, setPopupLoginSuccess] = useState(false);
  const [popupLoginError, setPopupLoginError] = useState(false);
  const redirectUrl = "/user";

  const submit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "/user/login",
      {
        username: username,
        password: password,
      },
      { withCredentials: true, credentials: "include" }
    );
    const data = response.data;

    if (data.user) {
      Cookies.set("jwt", data.user, { expires: 7 });
      setPopupLoginSuccess(true);
    } else {
      setPopupLoginError(true);
    }
  };

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
