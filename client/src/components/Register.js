import "../App.scss";
import "./register.scss";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import RedirectPopup from "./partials/popups/RedirectPopup";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popupRegisterSuccess, setPopupRegisterSuccess] = useState(false);
  const redirectUrl = "/user";
  const submit = async (event) => {
    event.preventDefault();
    // console.log(username + password);
    const response = await axios.post(
      "/user/register",
      {
        username: username,
        password: password,
      },
      { withCredentials: true, credentials: "include" }
    );
    let data = response.data;
    if (data.user) {
      Cookies.set("jwt", data.user, { expires: 7 });
      setPopupRegisterSuccess(true);
    } else {
      alert("Register unscuccessful");
    }
  };
  return (
    <div>
      <div id="register-page-container">
        <h1 id="register-page-heading">Register</h1>
        <div className="login-form-container">
          <form>
            <br />
            <input
              id="register-username-form"
              type="text"
              placeholder="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            ></input>
            <br />
            <input
              id="register-password-form"
              type="text"
              placeholder="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
            <br />
            <button className="register-button" onClick={submit}>
              Register
            </button>
          </form>
        </div>
      </div>
      <RedirectPopup
        trigger={popupRegisterSuccess}
        setTrigger={setPopupRegisterSuccess}
        redirectUrl={redirectUrl}
      >
        <h1>Registration Successful</h1>
      </RedirectPopup>
    </div>
  );
}

export default Register;
