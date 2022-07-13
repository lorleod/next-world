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
  // console.log("worldid at playlist backend", worldId);

  let ObjectId = require("mongodb").ObjectId;
  let o_id = new ObjectId(playlistId);
  console.log("o_id: ", o_id);

  let filter = { _id: o_id };

  console.log("filter: ", filter);

  const updatedDoc = {
    $push: { worldIds: worldId },
  };

  console.log("updatedDoc: ", updatedDoc);

  let result = await Playlist.updateOne(filter, updatedDoc);

  console.log("result: ", result);
});

router.post("/deleteworld", async (req, res) => {
  const worldId = req.body.worldId;
  const playlistId = req.body.playlistId;
  // console.log("worldid at playlist backend", worldId);

  let ObjectId = require("mongodb").ObjectId;
  let o_id = new ObjectId(playlistId);
  console.log("o_id: ", o_id);

  let filter = { _id: o_id };

  console.log("filter: ", filter);

  const updatedDoc = {
    $pull: { worldIds: worldId },
  };

  console.log("updatedDoc: ", updatedDoc);

  let result = await Playlist.updateOne(filter, updatedDoc);

  console.log("result: ", result);
});
module.exports = router;
