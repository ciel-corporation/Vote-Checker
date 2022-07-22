const client = require("../index.js");

module.exports = async (message) => {
  const channel = client.channels.cache.get(process.env.channelId);
  await channel.send(message);
};
