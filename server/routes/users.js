const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../Schema/users-schema");
router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const maxAge = 1000 * 60 * 60 * 24 * 7;
  const createToken = (id) => {
    return jwt.sign({ id }, "secret123", { expiresIn: maxAge });
  };

  try {
    const user = await User.create({ Username: username, Password: password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.json({ status: "error", message: "username already created" });
  }
});

module.exports = router;
