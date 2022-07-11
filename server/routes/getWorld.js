const router = require("express").Router();
const { WorldsApi } = require("../vrcApi");



router.post("/", async (req, res) => {
  console.log("req.body.text", req.body.text)

  const search = req.body.text
  WorldsApi.searchWorlds(false, "popularity", undefined, undefined, 3, "descending", 0, search)
  .then((worldResults) => {
    console.log("WORLDRESULTS: ", worldResults.data)
  });
})




    // WorldsApi.getWorld("wrld_8a4d52a1-6941-4ed5-9a56-b2e8eb68ea46")
    // .then((response) => {
    //   console.log("getWorld: ", response.data)
    // })

module.exports = router;