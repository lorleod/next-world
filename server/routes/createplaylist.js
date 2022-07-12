const router = require("express").Router();
const Playlist = require("../Schema/playlists-schema");
const jwt = require("jsonwebtoken");

// Generate a random string
const generateRandomString = function () {
  let randomString = "";
  const charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const setLength = charSet.length;
  for (let i = 0; i <= 10; i++) {
    randomString += charSet.charAt(Math.floor(Math.random() * setLength));
  }
  return randomString;
};

router.post("/", async (req, res) => {

  console.log("Playlist route req.body", req.body);

  const title = req.body.title;
  const description = req.body.description;
  const token = req.body.token;

  // verify a token - symmetric - synchronous
  let decoded = jwt.verify(token, process.env.JWTSECRET);
  console.log("decoded: ", decoded)


  try {
    const playlist = await Playlist.create({
      title: title,
      description: description,
      numberOfLikes: 0,
      worlds: [],
      user_id: decoded.id

    });
    res.send(playlist._id);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

module.exports = router;