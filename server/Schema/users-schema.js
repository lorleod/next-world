const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", usersSchema);
