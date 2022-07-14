import "../App.scss";
import "./login.scss";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    //console.log(username, password);
    const response = await axios.post(
      "http://localhost:3001/user/login",
      {
        username: username,
        password: password,
      },
      { withCredentials: true, credentials: "include" }
    );
    const data = response.data;

    if (data.user) {
      // console.log(data);
      Cookies.set("jwt", data.user, { expires: 7 });
      alert("Login successful");
      window.location.href = "/user";
    } else {
      alert("Please check credentials");
    }

    console.log(data);
  };

  return (
    <div className="App">
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
            <button className="login-button" onClick={submit}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
