const router = require("express").Router();
const User = require("../Schema/playlists-schema");
const { WorldsApi } = require("../vrcApi");
const Playlist = require("../Schema/playlists-schema");

router.get("/:playlistId", async (req, res) => {
  let playlistId = req.params.playlistId;

  let ObjectId = require("mongodb").ObjectId;
  let o_id = new ObjectId(playlistId);

  const playlist = await Playlist.findOne({ _id: o_id });

  return res.send(playlist);
});
// console.log("playlistID: ", playlistId);

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
  const updatedDoc = {
    $set: { title: title, description: description },
  };
  await Playlist.updateOne(filter, updatedDoc);
});

router.delete("/delete", async (req, res) => {
  try {
    const playlistId = req.body._id;
    console.log("response1:", res);
    await Playlist.deleteOne({ _id: playlistId });
    res.send("deleted");
  } catch (error) {
    console.log("error in catch: ", error);
  }
  // console.log("updatedDoc: ", updatedDoc);

  let result = await Playlist.updateOne(filter, updatedDoc);

  // console.log("result: ", result);
});

router.delete("/deleteworld", async (req, res) => {
  const worldId = req.body.worldId;
  console.log("worldId at world delete backend", worldId);
  const playlistId = req.body.playlistId;
  console.log("playlistId at world delete backend", playlistId);

  let ObjectId = require("mongodb").ObjectId;
  let o_id = new ObjectId(playlistId);
  // console.log("o_id: ", o_id);

  let filter = { _id: o_id };

  // console.log("filter: ", filter);

  const updatedDoc = {
    $pull: { worldIds: worldId },
  };

  // console.log("updatedDoc: ", updatedDoc);

  let result = await Playlist.updateOne(filter, updatedDoc);

  // console.log("result: ", result);
  res.send("deleted world");
});

module.exports = router;
