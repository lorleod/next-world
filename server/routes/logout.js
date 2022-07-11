const router = require("express").Router();

router.get("/", async (req, res) => {
  res.cookie("jwt", "expiredtoken", { maxAge: 1 });
  console.log("delete cookie");
});

module.exports = router;
