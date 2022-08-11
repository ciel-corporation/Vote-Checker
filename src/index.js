const { Client } = require("discord.js");
const config = require("./config.json");

(async () => {
  const client = new Client({ intents: 3258367 });
  await client.login(config.botToken);

  module.exports = client;
  await require("./loaders/")(client);
  await require("./database/").connect();
  await require("./utils/roleManager.js").getUsersVoted();
  await require("./server/server.js").listen(process.env.PORT || 3000);
})();
