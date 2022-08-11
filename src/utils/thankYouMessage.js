const client = require("../index.js");
const config = require("../config.json");

module.exports = async (userId) => {
  const channel = await client.channels.fetch(config.channelId);
  if (!channel) return;

  await channel.send(
    `<@${userId}> agradeço por ter votado  <:ok3:977910239531782174>.`
  );
};
