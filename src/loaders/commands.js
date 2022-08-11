const { Collection, Routes } = require("discord.js");
const config = require("../config.json");
const { readdirSync } = require("fs");
const { REST } = require("@discordjs/rest");

async function Commands(client) {
  client.commands = new Collection();

  const commands = readdirSync("./src/commands/");
  const allCommands = [];

  for (const file of commands) {
    const command = new (require(`../commands/${file}`))();
    const commandName = file.split(".")[0];

    command.setName(commandName);
    command.setDMPermission(false);

    client.commands.set(commandName, command);
    allCommands.push(command.toJSON());
    delete require.cache[require.resolve(`../commands/${file}`)];
  }

  const rest = new REST({ version: "9" }).setToken(config.botToken);

  await rest.put(Routes.applicationCommands(config.clientId), {
    body: allCommands,
  });

  console.log("[COMMANDS] - All commands have been loaded");
}

module.exports = Commands;
