const express = require("express");
const app = express();
const port = 3001;
const mongo = require("./mongo");
require('dotenv').config()
const UsersSchema = require("./Schema/users-schema");

// Step 1. We begin with creating a Configuration, which contains the username and password for authentication.
const vrchat = require("vrchat");
const configuration = new vrchat.Configuration({
    username: process.env.VRCUSER,
    password: process.env.VRCPASSWORD
});

// Step 2. VRChat consists of several API's (WorldsApi, UsersApi, FilesApi, NotificationsApi, FriendsApi, etc...)
// Here we instantiate the Authentication API which is required for logging in.
const AuthenticationApi = new vrchat.AuthenticationApi(configuration);

// Step 3. Calling getCurrentUser on Authentication API logs you in if the user isn't already logged in.
AuthenticationApi.getCurrentUser()
  .then(resp => {
    const currentUser = resp.data;
    console.log(`Logged in as: ${currentUser.displayName}`)
}).catch(error => {
  console.log("ERROR:", error)
});



app.use(express.json());

const connectToMongo = async () => {
  await mongo().then(async (mongoose) => {
    try {
      console.log("connecting to mongodb");
      const user = {
        Username: "Kevin",
        Password: "password",
      };

      await new UsersSchema(user).save();
    } finally {
      mongoose.connection.close();
    }
  });
};

connectToMongo();

app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});
