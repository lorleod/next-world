const router = require("express").Router();

const usersSchema = require("../Schema/users-schema");
router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = new usersSchema({ Username: username, Password: password });
  try {
    await user.save();
    res.send("inserted into users");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
