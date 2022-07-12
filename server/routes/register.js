const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../Schema/users-schema");
router.post("/", async (req, res) => {

  console.log("registration posted!")
  const username = req.body.username;
  const password = req.body.password;
  console.log("register.js router.post username: ", username)

  const maxAge = 1000 * 60 * 60 * 24 * 7;
  const createToken = (id) => {
    return jwt.sign({ id }, "secret123", { expiresIn: maxAge });
  };

  try {
    const user = await User.create({ username: username, password: password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge });
    res.status(201).json({ user: token  });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

module.exports = router;
