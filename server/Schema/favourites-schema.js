const mongoose = require("mongoose");

const Favourites = mongoose.Schema({
  playlist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlists",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("favourites", Favourites);
