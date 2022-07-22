const { User } = require("../database/");
const client = require("../index.js");
const { guildId, roleId } = require("../config.json");

module.exports = {
  async addRole(userId) {
    const member = await this.fetchMember(userId);
    if (!member) return;

    if (!member.roles.cache.get(roleId)) {
      await member.roles.add(roleId, "reward for voting").catch(console.error);

      await User.findByIdAndUpdate(userId, {
        $inc: { "wishes.server_topgg": 1 },
        "cooldowns.server_topgg": Date.now(),
      });
    }
  },

  async removeRole(userId) {
    const member = await this.fetchMember(userId);
    if (!member) return;

    await member.roles
      .remove(roleId, "An incentive to vote again")
      .catch(console.error);

    await User.findByIdAndUpdate(userId, {
      "cooldowns.server_topgg": 0,
    });
  },

  async fetchMember(id) {
    const guild = await client.guilds.fetch(guildId);
    const member = guild.members.cache.get(id);
    return member;
  },
};
