const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");

// Step 1. We begin with creating a Configuration, which contains the username and password for authentication.
const vrchat = require("vrchat");
const configuration = new vrchat.Configuration({
  username: process.env.VRCUSER,
  password: process.env.VRCPASSWORD,
});

// Step 2. VRChat consists of several API's (WorldsApi, UsersApi, FilesApi, NotificationsApi, FriendsApi, etc...)
// Here we instantiate the Authentication API which is required for logging in.
const AuthenticationApi = new vrchat.AuthenticationApi(configuration);

// Step 3. Calling getCurrentUser on Authentication API logs you in if the user isn't already logged in.
AuthenticationApi.getCurrentUser()
  .then((resp) => {
    const currentUser = resp.data;
    console.log(`Logged in as: ${currentUser.displayName}`);
  })
  .catch((error) => {
    console.log("ERROR:", error);
  });

//Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
require("dotenv").config();

//Routes
app.use("/user/register", usersRoute);
app.use("/user/login", loginRoute);
app.use("/user/logout", logoutRoute);

//Connecting to MongoDB
mongoose.connect(
  "mongodb+srv://NextWorld:KRT176LHL@nextworldcluster.i7wjs.mongodb.net/NextWorldDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

//Main server
app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});
