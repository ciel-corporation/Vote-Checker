const config = require("../config.json");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;
  await interaction.deferReply();

  const command = client.commands.get(interaction.commandName);
  if (!command) return interaction.editReply("Command unavailable ¯\\_(ツ)_/¯");

  if (false) {
    return interaction.editReply("You don't have enough permission for this!");
  }
  if (command.isOwner && !config.ownerIds.includes(interaction.user.id))
    return interaction.editReply(
      "You are not authorized to do so! ¯\\_(ツ)_/¯"
    );

  await command.code(client, interaction);
};
