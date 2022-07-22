module.exports = async (client) => {
  client.user.setStatus("dnd");
  console.log(`${client.user.username} is online!`);
};
