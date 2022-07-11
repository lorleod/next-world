const router = require("express").Router();

const User = require("../Schema/users-schema");
router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = new User({ Username: username, Password: password });
    await user.save();
    console.log("user created");
  } catch (err) {
    console.log("username already taken");
  }
});

module.exports = router;
