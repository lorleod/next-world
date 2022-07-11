const router = require("express").Router();

const User = require("../Schema/users-schema");
router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = new User({ Username: username, Password: password });
    await user.save();
    res.json({ status: "ok", message: "user created" });
  } catch (err) {
    res.json({ status: "error", message: "username already created" });
  }
});

module.exports = router;
