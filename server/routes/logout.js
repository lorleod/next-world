const router = require("express").Router();

router.post("/", async (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({ message: "logout successful" });
});

module.exports = router;
