const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Favourites = require("../schema/favourites-schema");
const Playlist = require("../Schema/playlists-schema");

router.post("/:token/:playlist_id", async (req, res) => {
  const token = req.params.token;
  const playlist_id = req.params.playlist_id;
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const user_id = decoded._id;
    await Favourites.create({
      playlist_id: playlist_id,
      user_id: user_id,
    });
  } catch (error) {}
});

router.get("/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const user_id = decoded._id;
    const favourites = await Favourites.find({ user_id: user_id });
    res.send(favourites);
  } catch (error) {}
});

router.get("/user/:playlist_id", async (req, res) => {
  try {
    const playlist_id = req.params.playlist_id;
    const playlistInfo = await Playlist.find({ _id: playlist_id });
    res.send(playlistInfo);
  } catch (error) {}
});

router.delete("/delete/:playlist_id", async (req, res) => {
  const playlist_id = req.params.playlist_id;
  try {
    await Favourites.deleteOne({ playlist_id: playlist_id });
    res.send("deleted");
  } catch (error) {}
});

router.get("/count/:playlist_id", async (req, res) => {
  try {
    const playlist_id = req.params.playlist_id;
    const favourites = await Favourites.find({ playlist_id: playlist_id });
    res.send(favourites);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
