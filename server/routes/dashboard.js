const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Playlist = require("../Schema/playlists-schema");

router.get("/", async (req, res) => {
  console.log()
  const token = req.cookies.jwt;
  let decoded = jwt.verify(token, process.env.JWTSECRET);
  try {
    const playlists = await Playlist.find({ user_id: decoded._id });
    res.send({ username: decoded.username, playlists: playlists });
  } catch (error) {}
});

router.get("/:userid", async (req, res) => {
  const userId = req.params.userId;

  console.log("Dashboard req.params", req.params);

  try {
    const userInfo = await User.find({ user_id: userId});
    res.send({ username: userInfo });
  } catch (error) {
    console.log("error", error);
  }
});


module.exports = router;
