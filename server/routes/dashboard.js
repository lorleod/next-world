const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Playlist = require("../Schema/playlists-schema");
const User = require("../Schema/users-schema");

router.get("/:token", async (req, res) => {
  const token = req.params.token;
  let decoded = jwt.verify(token, process.env.JWTSECRET);
  try {
    const playlists = await Playlist.find({ user_id: decoded._id });
    res.send({ username: decoded.username, playlists: playlists });
  } catch (error) {}
});

router.get("/:userid", async (req, res) => {
  console.log("Dashboard req.params.userid", req.params.userid);
  const userId = req.params.userid;

  try {
    const userInfo = await User.find({ _id: userId });
    console.log("userInfo[0].username: ", userInfo[0].username);
    res.send({ username: userInfo[0].username });
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
