import "./App.scss";
import Nav from "./components/partials/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddWorld from "./components/AddWorld";
import CreatePlaylist from "./components/CreatePlaylist";
import Playlist from "./components/partials/Playlist";
import Search from "./components/SearchWorlds";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/playlist/create" element={<CreatePlaylist />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/playlist/:id/addworld" element={<AddWorld />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
