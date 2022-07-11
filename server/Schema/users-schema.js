const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

// User.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.Password, salt);
//     this.Password = hashedPassword;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = mongoose.model("users", User);
