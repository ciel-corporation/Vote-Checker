const client = require("../index.js");
const { guildId, roleId } = require("../config.json");
const { UserSchema, cooldown } = require("ciel-utils");
const time = 63000000;

async function addRole(userId) {
  const member = await fetchMember(userId);
  if (!member) return;

  if (member.roles.cache.get(roleId)) return;
  await member.roles.add(roleId, "reward for voting").catch(console.error);
  setTimeout(async () => await removeRole(userId), time);
}

async function removeRole(userId) {
  const member = await fetchMember(userId);
  if (!member) return;
  if (!member.roles.cache.get(roleId)) return;

  await member.roles
    .remove(roleId, "An incentive to vote again")
    .catch(console.error);
}

async function getUsersVoted() {
  const allUsers = await UserSchema.find();
  const users = allUsers.filter((x) => x.cooldowns.wishes.topgg_server > 0);

  for (const user of users) {
    const [released] = cooldown(user.cooldowns.wishes.topgg_server, time);

    if (released) await removeRole(user._id);
    else await addRole(user._id);
  }
}

async function fetchMember(id) {
  const guild = await client.guilds.fetch(guildId);
  const member = guild.members.cache.get(id);
  return member;
}

module.exports = {
  addRole,
  removeRole,
  getUsersVoted,
};
