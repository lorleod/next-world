const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Playlist = require("../Schema/playlists-schema");
const User = require("../Schema/users-schema");

// receive GET request, decode token and return username + query db for user's playlists
router.get("/:token", async (req, res) => {
  const token = req.params.token;
  let decoded = jwt.verify(token, process.env.JWTSECRET);
  try {
    const playlists = await Playlist.find({ user_id: decoded._id });
    res.json({ username: decoded.username, playlists: playlists });
  } catch (error) {}
});

router.get("/home/:userid", async (req, res) => {
  const userId = req.params.userid;

  try {
    const userInfo = await User.find({ _id: userId });
    res.json({ username: userInfo[0].username });
  } catch (error) {
    res.json("Account deleted");
    console.log("error", error);
  }
});

module.exports = router;
