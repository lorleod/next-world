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

module.exports = router;
