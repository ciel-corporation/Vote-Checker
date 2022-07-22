const config = require("../config.json");

module.exports = async (client, interaction) => {
  await interaction.deferReply();

  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.editReply("Command unavailable ¯\\_(ツ)_/¯");

    if (!config.ownerId.includes(interaction.user.id))
      return interaction.editReply(
        "You are not authorized to do so! ¯\\_(ツ)_/¯"
      );

    await command.code(client, interaction);
  }
};
