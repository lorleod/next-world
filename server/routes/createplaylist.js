const router = require("express").Router();
const Playlist = require("../Schema/playlists-schema");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  // console.log("Playlist route req.body", req.body);

  const title = req.body.title;
  const description = req.body.description;
  const token = req.body.token;

  // verify a token - symmetric - synchronous
  let decoded = jwt.verify(token, process.env.JWTSECRET);

  try {
    const playlist = await Playlist.create({
      title: title,
      description: description,
      numberOfLikes: 0,
      worlds: [],
      user_id: decoded._id,
    });
    res.send(playlist._id);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

module.exports = router;
