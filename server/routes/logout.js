const router = require("express").Router();

router.get("/", async (req, res) => {
  res.clearCookie("jwt");
  console.log("delete cookie");
  return res.status(200).json({ message: "logout successful" });
});

module.exports = router;
