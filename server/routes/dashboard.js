const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Playlist = require("../Schema/playlists-schema");

router.get("/", async (req, res) => {
  const token = req.cookies.jwt;
   console.log(token);
  let decoded = jwt.verify(token, process.env.JWTSECRET);
   console.log("decoded: ", decoded);
  try {
    const playlists = await Playlist.find({ user_id: decoded._id });
     console.log(playlists);
    res.send({ username: decoded.username, playlists: playlists });
  } catch (error) {}
});

module.exports = router;
