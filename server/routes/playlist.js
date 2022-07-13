const router = require("express").Router();
const User = require("../Schema/playlists-schema");
const { WorldsApi } = require("../vrcApi");
const Playlist = require("../Schema/playlists-schema");

router.get("/:playlistId", async (req, res) => {
  let playlistId = req.params.playlistId;

<<<<<<< HEAD


})
=======
  // console.log("playlistID: ", playlistId);
>>>>>>> 2aad6a3aa663856473ce08416d06b753ce1a8e6b

  let ObjectId = require("mongodb").ObjectId;
  let o_id = new ObjectId(playlistId);

  const playlist = await Playlist.findOne({ _id: o_id });

  // console.log("PLAYLIST: ", playlist);
  return res.send(playlist);

  // request to VRC API getWorld
  // let worldArray = [
  //   "wrld_c7407bed-0a85-4608-8906-3c3ac2f2fb5a",
  //   "wrld_791ebf58-54ce-4d3a-a0a0-39f10e1b20b2",
  // ];
  // let worldArray = playlist.worldIds;

  // map array of worldIDs to an array of world objects
  // worldArray.map((worldId) => {
  //   WorldsApi.getWorld(worldID);
  //   // .then((worldResult) => {
  //   //   return worldResult
  //   // });
  // });

  // return res.json({ status: "ok" });
});

module.exports = router;
