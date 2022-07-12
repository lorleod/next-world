const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.Schema({
  // QUESTION: should these be capitalized?
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

User.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.Password, salt);
    this.Password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

//started making a playlist schema - move into new file if desired
const Playlistdb = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    maxLength: 40
  },
  description: {
    type: String
  },
  numberOfLikes: {
    type: Number,
    min: 0,
  },
  worldIds: {
    type: Array
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  }
})

module.exports = mongoose.model("users", User);
