const vrchat = require("vrchat");

import { Routes, Route } from "react-router-dom";
import { USERNAME, PASSWORD } from '../.env.local'

import "./App.scss";
import Nav from "./components/partials/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddWorld from "./components/AddWorld";
import User from "./components/User";


// Step 1. We begin with creating a Configuration, which contains the username and password for authentication.
const configuration = new vrchat.Configuration({
    username: USERNAME,
    password: PASSWORD
});

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addworld" element={<AddWorld />} />
      </Routes>
    </div>
  );
}

export default App;
