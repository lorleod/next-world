const router = require("express").Router();
const { WorldsApi } = require("../vrcApi");

router.post("/", async (req, res) => {

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
    res.send(worldResults.data);
  });
});

router.get("/:worldId", async (req, res) => {
  const worldId = req.params.worldId;
  WorldsApi.getWorld(worldId).then((response) => {
    res.send(response.data);
  });
});

module.exports = router;
