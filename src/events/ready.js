const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  client.user.setPresence({
    activities: [{ name: "a vida dos outros", type: ActivityType.Watching }],
    status: "dnd",
  });
  console.log(`${client.user.tag} is online!`);
};
