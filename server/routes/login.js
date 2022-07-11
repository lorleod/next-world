const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Schema/users-schema");
router.post("/", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ Username: username, Password: password });

  if (user) {
    // bcrypt.compare(password, User.password);
    const token = jwt.sign(
      {
        Username: username,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

module.exports = router;
