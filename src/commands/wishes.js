const config = require("../config.json");
const { stripIndents } = require("common-tags");
const { User } = require("../database/");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  time,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");

class Wishes extends SlashCommandBuilder {
  constructor() {
    super();
    this.setDescription("See your votes");
  }

  async code(client, interaction) {
    const topggEmoji = client.emojis.cache.get("987567488051081226");
    const voidEmoji = client.emojis.cache.get("987567472037224523");

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
      author: {
        name: "Sistema de votos",
        icon_url: voidEmoji.url,
      },
      description: description,
      color: config.colorEmbed,
    });

    const urls = {
      bot_topgg: `https://top.gg/bot/${client.user.id}`,
      server_topgg: `https://top.gg/servers/${config.guildId}`,
      bot_voidbots: `https://voidbots.net/bot/${client.user.id}`,
    };

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setEmoji(topggEmoji.toString())
        .setLabel("Ciel Topgg")
        .setURL(urls.bot_topgg)
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setEmoji(voidEmoji.toString())
        .setLabel("Ciel Voidbots")
        .setURL(urls.bot_voidbots)
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setEmoji(topggEmoji.toString())
        .setLabel("Server Topgg")
        .setURL(urls.server_topgg)
        .setStyle(ButtonStyle.Link)
    );

    interaction.editReply({ embeds: [embed], components: [row] });
  }
}

module.exports = Wishes;
