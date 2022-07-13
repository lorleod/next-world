const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Schema/users-schema");
router.post("/", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username: username });

  if (user) {
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (isValid) {
        const token = jwt.sign(
          {
            username: user.username,
            _id: user._id,
          },
          "secret123"
        );
        // res.cookie("jwt", token, { maxAge: maxAge });
        return res.json({ status: "ok", user: token });
      }
      if (err) {
        return res.json({ status: "error", message: "passwords don't match" });
      }
    });
  } else {
    return res.json({ status: "error", user: false });
  }
});

module.exports = router;
