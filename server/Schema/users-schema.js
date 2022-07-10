const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

usersSchema.pre("save", async function (next) {
  try {
    console.log(this.Password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.Password, salt);
    this.Password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("users", usersSchema);
