const router = require("express").Router();
const Playlist = require("../Schema/playlists-schema");

router.get('/', async (req, res) => {
  try {
    //get all playlists from db
    const publicPlaylists = await Playlist.find();

    return res.send(publicPlaylists);
  } catch (err) {
    res.send({message: err});
  }
});

module.exports = router;