const mongoose = require("mongoose");

const Playlist = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 40,
  },
  description: {
    type: String,
  },
  worldIds: {
    type: Array,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("playlists", Playlist);
