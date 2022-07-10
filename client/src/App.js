import "./App.scss";
import Nav from "./components/partials/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddWorld from "./components/AddWorld";
import User from "./components/User";
import { Routes, Route } from "react-router-dom";
import vrchat from "vrchat";

// console.log("PROCESS: ", process.env)
// console.log("PROCESS.USERNAME: ", process.env.REACT_APP_PASSWORD)

// // API Step 1. We begin with creating a Configuration, which contains the username and password for authentication.
// const configuration = new vrchat.Configuration({
//     username: process.env.REACT_APP_USERNAME,
//     password: process.env.REACT_APP_PASSWORD
// });

// // API Step 2. Use configuration to authenticate
// const AuthenticationApi = new vrchat.AuthenticationApi(configuration);

// // Step 3. Calling getCurrentUser on Authentication API logs you in if the user isn't already logged in.
// AuthenticationApi.getCurrentUser()
//   .then(resp => {
//     const currentUser = resp.data;
//     console.log(`Logged in as: ${currentUser.displayName}`);
//   });

//   console.log("VRCHAT: ", vrchat);


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
