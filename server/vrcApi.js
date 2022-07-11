const vrchat = require("vrchat");

// Step 1. We begin with creating a Configuration, which contains the username and password for authentication.
const configuration = new vrchat.Configuration({
    username: process.env.VRCUSER,
    password: process.env.VRCPASSWORD
});

// Step 2. VRChat consists of several API's (WorldsApi, UsersApi, FilesApi, NotificationsApi, FriendsApi, etc...)
// Here we instantiate the Authentication API which is required for logging in.
const AuthenticationApi = new vrchat.AuthenticationApi(configuration);
const WorldsApi = new vrchat.WorldsApi(configuration);

// Step 3. Calling getCurrentUser on Authentication API logs you in if the user isn't already logged in.
AuthenticationApi.getCurrentUser()
  .then(resp => {
    const currentUser = resp.data;
    console.log(`Logged in as: ${currentUser.displayName}`)
    // console.log("VRCHAT: ", WorldsApi)

    // WorldsApi.searchWorlds(false, "popularity", undefined, undefined, 3, "descending", 0, "void")
    // .then((worldResults) => {
    //   console.log("WORLDRESULTS: ", worldResults.data)
    // });

    // WorldsApi.getWorld("wrld_8a4d52a1-6941-4ed5-9a56-b2e8eb68ea46")
    // .then((response) => {
    //   console.log("getWorld: ", response.data)
    // })



    // console.log("world: ", )
}).catch(error => {
  console.log("ERROR:", error)
});