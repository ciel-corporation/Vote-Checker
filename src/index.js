const { Client } = require("discord.js");
const config = require("./config.json");
require("dotenv").config();

(async () => {
  const client = new Client({ intents: 3258367 });
  module.exports = client;

  await client.login(config.tokenBot);
  await require("./database/").connect();
  await require("./loaders/")(client);
  await require("./server.js");
  await require("./modules/getUsersVoted.js")();

  console.log("Index successfully loaded");
})();
