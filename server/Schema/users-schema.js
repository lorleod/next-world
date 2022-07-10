const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", UsersSchema);
