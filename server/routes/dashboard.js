const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Playlist = require("../Schema/playlists-schema");

router.get("/", async (req, res) => {
  const token = req.cookies.jwt;
  // console.log(token);
  let decoded = jwt.verify(token, process.env.JWTSECRET);
  // console.log("decoded: ", decoded);
  try {
    const playlists = await Playlist.find({ user_id: decoded._id });
    console.log(playlists);
    res.send({ username: decoded.username, playlists: playlists });
  } catch (error) {}
});

router.get("/:id", async (req, res) => {
  const playlistId = req.params.id;
  console.log("userdashbord ids", playlistId);
  const playlists = await Playlist.find({ _id: playlistId });
  console.log("dashboard playlists", playlists);
});

module.exports = router;
