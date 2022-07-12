const router = require("express").Router();
const Playlist = require("../Schema/playlists-schema");
router.post("/", async (req, res) => {

  console.log("Playlist route req.body", req.body);

  const title = req.body.title;
  const description = req.body.description;


  try {
    const playlist = await Playlist.create({
      title: title,
      description: description,
      numberOfLikes: 0,
      worlds: [],
      // user_id: 0
    });
    res.status(201).json({ playlist: playlist._id });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

module.exports = router;