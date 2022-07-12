const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const api = require("./routes/getWorld");
require("./vrcApi");

//Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
require("dotenv").config();

//Routes
app.use("/user/register", usersRoute);
app.use("/user/login", loginRoute);
app.use("/user/logout", logoutRoute);
app.use("/api/getWorld", api);

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
