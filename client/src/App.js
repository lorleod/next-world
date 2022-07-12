import "./App.scss";
import Nav from "./components/partials/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AddWorld from "./components/AddWorld";
import CreatePlaylist from "./components/CreatePlaylist";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addworld" element={<AddWorld />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/playlist/create" element={<CreatePlaylist />} />
      </Routes>
    </div>
  );
}

export default App;
