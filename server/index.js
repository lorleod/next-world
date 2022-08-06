require("./vrcApi");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const homeRoute = require("./routes/home");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const api = require("./routes/getWorld");
const createPlaylistRoute = require("./routes/createplaylist");
const playlist = require("./routes/playlist");
const dashboard = require("./routes/dashboard");
const favouritesRoute = require("./routes/favourites");

//Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
require("dotenv").config();

app.use("/", express.static('../client/build'))

//Routes
app.use("/api/home", homeRoute);
app.use("/api/user/register", registerRoute);
app.use("/api/user/login", loginRoute);
app.use("/api/user/logout", logoutRoute);
app.use("/api/getWorld", api);
app.use("/api/playlist", playlist);
app.use("/api/playlist/create", createPlaylistRoute);
app.use("/api/playlist/addworld", playlist);
app.use("/api/playlist/delete", playlist);
app.use("/api/user", dashboard);
app.use("/api/favourites", favouritesRoute);

app.use("/*", express.static('../client/build'))


//Connecting to MongoDB
mongoose.connect(
  `mongodb+srv://${process.env.MONGODBSECRET}/NextWorldDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
  }
);

//Main server
app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});
