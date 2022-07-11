import "../App.scss";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    //console.log(username, password);
    const response = await axios.post("http://localhost:3001/user/login", {
      username: username,
      password: password,
    });
    const data = response.data;

    if (data.user) {
      alert("Login successful");
      window.location.href = "/";
    } else {
      alert("Please check credentials");
    }

    console.log(data);
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button onClick={submit}>Login</button>
      </form>
    </div>
  );
}

export default Login;
