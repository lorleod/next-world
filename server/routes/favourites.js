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
    res.json("favourite added");
  } catch (error) {}
});

router.get("/:token", async (req, res) => {
  try {
    // decode token to get userID
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const user_id = decoded._id;

    //query db for all favourite playlists for that userID
    const favourites = await Favourites.find({ user_id: user_id });
    res.json(favourites);
  } catch (error) {}
});

router.get("/user/:playlist_id", async (req, res) => {
  try {
    const playlist_id = req.params.playlist_id;
    const playlistInfo = await Playlist.find({ _id: playlist_id });
    res.json(playlistInfo);
  } catch (error) {}
});

router.delete("/delete/:token/:playlist_id", async (req, res) => {
  const playlist_id = req.params.playlist_id;
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const user_id = decoded._id;
    await Favourites.deleteOne({ playlist_id: playlist_id, user_id: user_id });
    res.json("deleted");
  } catch (error) {}
});

router.get("/count/:playlist_id", async (req, res) => {
  try {
    const playlist_id = req.params.playlist_id;
    const favourites = await Favourites.find({ playlist_id: playlist_id });
    res.json(favourites);
  } catch (error) {
    console.log(error);
  }
});

router.get("/check/:token/:playlist_id", async (req, res) => {
  const token = req.params.token;
  const playlist_id = req.params.playlist_id;
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const user_id = decoded._id;
    const favourites = await Favourites.find({
      user_id: user_id,
      playlist_id: playlist_id,
    });
    console.log(favourites);
    res.json(favourites);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
