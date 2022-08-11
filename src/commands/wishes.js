/* eslint-disable indent */

const { UserSchema, cooldown } = require("ciel-utils");
const { stripIndents } = require("common-tags");
const { colorEmbed, guildId, mainBotClientId } = require("../config.json");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  time,
} = require("discord.js");

class Wishes extends SlashCommandBuilder {
  constructor() {
    super();
    this.setDescription("See your votes");
    this.urls = {
      cielTopgg: "https://top.gg/bot/" + mainBotClientId,
      cielVoidBots: "https://voidbots.net/bot/" + mainBotClientId,
      serverTopgg: "https://top.gg/servers/" + guildId,
    };
  }

  async code(client, interaction) {
    const topggEmoji = client.emojis.cache.get("987567488051081226");
    const voidbotsEmoji = client.emojis.cache.get("987567472037224523");

    const user = await UserSchema.findById(interaction.user.id);
    const {
      wishes,
      cooldowns: { wishes: cooldowns },
    } = user;

    const description = stripIndents`
    > Vote para guanhar algumas recompensas, e isso tmb nos ajuda muito <:very_happy:977910300718284810>." +
      
    Ciel Topgg: **${wishes.bot.topgg}** (${this.calcCooldown(
      cooldowns.topgg_bot
    )})
    Ciel VoidBots **${wishes.bot.voidbots}** (${this.calcCooldown(
      cooldowns.voidbots_bot
    )})
      Server Topgg: **${wishes.server.topgg}** (${this.calcCooldown(
      cooldowns.topgg_server
    )})`;

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Sistema de votos", iconURL: voidbotsEmoji.url })
      .setDescription(stripIndents`${description}`)
      .setColor(colorEmbed);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setEmoji(topggEmoji.id)
        .setURL(this.urls.cielTopgg)
        .setLabel("Ciel Topgg")
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setEmoji(voidbotsEmoji.id)
        .setURL(this.urls.cielVoidBots)
        .setLabel("Ciel Voidbots")
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setEmoji(topggEmoji.id)
        .setURL(this.urls.serverTopgg)
        .setLabel("Server Topgg")
        .setStyle(ButtonStyle.Link)
    );

    interaction.editReply({ embeds: [embed], components: [row] });
  }

  calcCooldown(timestamp) {
    const [released, timeLeft] = cooldown(timestamp, 43200000);

    if (released) return "Já pode votar";
    else return time(new Date(Date.now() + timeLeft));
  }
}

module.exports = Wishes;
