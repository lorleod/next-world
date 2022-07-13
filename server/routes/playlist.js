const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Playlist = require("../Schema/playlists-schema");
const User = require("../Schema/users-schema");

router.get("/:playlistId", async (req, res) => {
  let playlistId = req.params.playlistId;

  let ObjectId = require("mongodb").ObjectId;
  let o_id = new ObjectId(playlistId);

  const playlist = await Playlist.findOne({ _id: o_id });

  return res.send(playlist);
});
// console.log("playlistID: ", playlistId);

router.get("/auth/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let decoded = jwt.verify(token, process.env.JWTSECRET);
    let user_id = decoded._id;
    console.log("user_id: ", user_id);
    return res.send(user_id);
  } catch (error) {}
});

router.post("/addworld", async (req, res) => {
  const worldId = req.body.worldId;
  const playlistId = req.body.playlistId;
  let ObjectId = require("mongodb").ObjectId;
  let o_id = new ObjectId(playlistId);
  let filter = { _id: o_id };
  const updatedDoc = {
    $push: { worldIds: worldId },
  };
  await Playlist.updateOne(filter, updatedDoc);
});

router.post("/edit", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const playlistId = req.body.playlistId;
  let ObjectId = require("mongodb").ObjectId;
  let o_id = new ObjectId(playlistId);
  let filter = { _id: o_id };
  try {
    const updatedDoc = {
      $set: { title: title, description: description },
    };
    await Playlist.updateOne(filter, updatedDoc);
    return res.send("Playlist updated");
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const playlistId = req.body._id;
    await Playlist.deleteOne({ _id: playlistId });
    res.send("deleted");
  } catch (error) {
    res.send("error");
  }
});

router.delete("/deleteworld", async (req, res) => {
  const worldId = req.body.worldId;
  const playlistId = req.body.playlistId;
  let ObjectId = require("mongodb").ObjectId;
  let o_id = new ObjectId(playlistId);
  let filter = { _id: o_id };

  const updatedDoc = {
    $pull: { worldIds: worldId },
  };
  let result = await Playlist.updateOne(filter, updatedDoc);

  res.send("deleted world");
});

router.get("/:token/favourite/:playlist_id", async (req, res) => {
  const token = req.params.token;
  const playlist_id = req.params.playlist_id;
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const user_id = decoded._id;
    console.log("user_id: ", user_id);
    let ObjectId = require("mongodb").ObjectId;
    let o_id = new ObjectId(user_id);
    let filter = { _id: o_id };
    const updatedDoc = {
      $push: { favourites: playlist_id },
    };
    await User.updateOne(filter, updatedDoc);
  } catch (error) {}
});
module.exports = router;
