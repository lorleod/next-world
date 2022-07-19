const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Playlist = require("../Schema/playlists-schema");
const User = require("../Schema/users-schema");

router.get("/:playlistId", async (req, res) => {
  let playlistId = req.params.playlistId;

  let ObjectId = require("mongodb").ObjectId;
  let o_id = new ObjectId(playlistId);

  const playlist = await Playlist.findOne({ _id: o_id });

  return res.json(playlist);
});

router.get("/auth/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let decoded = jwt.verify(token, process.env.JWTSECRET);
    let user_id = decoded._id;
    return res.json(user_id);
  } catch (error) {}
});

router.post("/addworld", async (req, res) => {
  try {
    const worldId = req.body.worldId;
    const playlistId = req.body.playlistId;
    let ObjectId = require("mongodb").ObjectId;
    let o_id = new ObjectId(playlistId);
    let filter = { _id: o_id };
    const updatedDoc = {
      $push: { worldIds: worldId },
    };
    await Playlist.updateOne(filter, updatedDoc);
    res.json("world added");
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
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
    return res.json("Playlist updated");
  } catch (error) {
    res.json(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const playlistId = req.body._id;
    await Playlist.deleteOne({ _id: playlistId });
    res.json("deleted");
  } catch (error) {
    res.json("error");
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

  res.json("deleted world");
});

router.get("/auth/:user_id/:playlist_id", async (req, res) => {
  try {
    const token = req.params.user_id;
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const user_id = decoded._id;
    const playlist_id = req.params.playlist_id;
    const playlist = await Playlist.findById({
      _id: playlist_id,
    });
    const object_id = playlist.user_id;
    const playlist_user_id = object_id.toString();
    if (playlist_user_id === user_id) {
      return res.json("Authorized");
    } else {
      return res.json("Unauthorized");
    }
  } catch (error) {
    res.json("Unauthorized");
  }
});

module.exports = router;
