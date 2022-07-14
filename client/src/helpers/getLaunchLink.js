function getLaunchLink(worldId) {
  const baseUrl = "https://vrchat.com/home/launch?worldId="

  const launchLink = baseUrl.concat(worldId);

  return launchLink;
};

module.exports = { getLaunchLink };