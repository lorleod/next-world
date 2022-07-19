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
    12,
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
    res.json(response.data);
  });
});

module.exports = router;
