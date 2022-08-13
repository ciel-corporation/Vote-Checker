const { PermissionsBitField } = require("discord.js");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;
  await interaction.deferReply();

  const command = client.commands.get(interaction.commandName);
  if (!command) return interaction.editReply("Command unavailable ¯\\_(ツ)_/¯");

  if (
    interaction.commandName === "setchannel" &&
    !interaction.member.permissions.has(
      PermissionsBitField.Flags.ManageChannels
    )
  ) {
    return interaction.editReply("You don't have enough permission for this!");
  }

  await command.code(client, interaction);
};
