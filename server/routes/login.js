const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Schema/users-schema");
router.post("/", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ Username: username });

  if (user) {
    bcrypt.compare(password, user.Password, (err, isValid) => {
      if (isValid) {
        const token = jwt.sign(
          {
            Username: username,
          },
          "secret123"
        );
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
