const { stripIndents } = require("common-tags");
const { User } = require("../database/");
const config = require("../config.json");
const { SlashCommandBuilder, EmbedBuilder, time } = require("discord.js");

class Wishes extends SlashCommandBuilder {
  constructor() {
    super();
    this.setDescription("See your votes");
  }

  async code(client, interaction) {
    const user = await User.findById(interaction.user.id);
    const { wishes, cooldowns } = user;

    const backIn = (timestamp) => {
      if (timestamp === 0) return "Já pode votar";

      const cooldown = 43200000; // 12 hours
      const now = Date.now();
      const date = cooldown - (now - timestamp);

      return time(new Date(now + date), "R");
    };

    const description = stripIndents`
    > Vote para para ganhar algumas recompensas, e isso tbm nos ajudar muito <:very_happy:1001253201032515614>.
    
		Ciel Topgg: ${wishes.bot_topgg}  (${backIn(cooldowns.bot_topgg)}) 
    Ciel VoidBots: ${wishes.bot_void}  (${backIn(cooldowns.bot_void)}) 
    Server Topgg: ${wishes.server_topgg}  (${backIn(cooldowns.server_topgg)})
    `;

    const embed = new EmbedBuilder({
      description: description,
      color: config.colorEmbed,
    });

    interaction.editReply({ embeds: [embed] });
  }
}

module.exports = Wishes;
