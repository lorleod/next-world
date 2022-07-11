import "../App.scss";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    // console.log(username + password);
    const response = await axios.post("http://localhost:3001/user/register", {
      username: username,
      password: password,
    });
    let data = response.data;
    console.log(data);
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
