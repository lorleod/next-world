const router = require("express").Router();
const { WorldsApi } = require("../vrcApi");

router.post("/", async (req, res) => {
  // console.log("req.body.text", req.body.text);

  const search = req.body.text;

  //request to VRC API SearchWorld
  WorldsApi.searchWorlds(
    false,
    "popularity",
    undefined,
    undefined,
    10,
    "descending",
    0,
    search
  ).then((worldResults) => {
    res.json(worldResults.data);
  });
});

router.get("/:worldId", async (req, res) => {
  const worldId = req.params.worldId;
  WorldsApi.getWorld(worldId).then((response) => {
    // console.log("getWorld: ", response.data);
    res.json(response.data);
  });
});

module.exports = router;
