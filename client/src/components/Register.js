import "../App.scss";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = (event) => {
    event.preventDefault();
    console.log(username + password);
    axios.post("http://localhost:3001/register/insert", {
      username: username,
      password: password,
    });
  };
  return (
    <div className="App">
      <h1>Register</h1>
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
        <button onClick={submit}>Register</button>
      </form>
    </div>
  );
}

export default Register;
