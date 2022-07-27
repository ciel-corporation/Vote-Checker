const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

class SetChannel extends SlashCommandBuilder {
  constructor() {
    super();
    this.setDescription("Set a channel to drop messages");
    this.addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("channel where the messages will fall")
        .setRequired(true)
    );
  }

  async code(client, interaction) {
    const channel = interaction.options.getChannel("channel");
    const tokens = require("../config.json");
    tokens.channelId = channel.id;

    await fs.writeFileSync( "./src/config.json", JSON.stringify(tokens, null, 2));
    interaction.editReply("Channel successfully set!");
  }
}

module.exports = SetChannel;
