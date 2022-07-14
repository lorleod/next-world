const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Playlist = require("../Schema/playlists-schema");

router.get("/:token", async (req, res) => {
  const token = req.params.token;
  let decoded = jwt.verify(token, process.env.JWTSECRET);
  try {
    const playlists = await Playlist.find({ user_id: decoded._id });
    res.send({ username: decoded.username, playlists: playlists });
  } catch (error) {}
});

module.exports = router;
