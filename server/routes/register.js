const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../Schema/users-schema");
router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.create({ username: username, password: password });
    const token = jwt.sign(
      { username: user.username, _id: user._id },
      "secret123"
    );
    // res.cookie("jwt", token, { maxAge: maxAge });
    return res.status(201).json({ user: token });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

module.exports = router;
