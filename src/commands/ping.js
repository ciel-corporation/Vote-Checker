const { SlashCommandBuilder } = require("@discordjs/builders");

class Ping extends SlashCommandBuilder {
  constructor() {
    super();
    this.setDescription("See my ping");
  }

  async code(client, interaction) {
    interaction.editReply(`My ping is **${client.ws.ping}ms**`);
  }
}

module.exports = Ping;
