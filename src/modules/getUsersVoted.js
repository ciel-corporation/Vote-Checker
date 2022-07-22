const { User } = require("../database/");
const roleManager = require("./roleManager.js");

module.exports = async () => {
  const allUsers = await User.find();
  const users = allUsers.filter((x) => x.cooldowns.server_topgg > 0);
  
  for (const user of users) {
    const lastTime = user.cooldowns.server_topgg;
    const waitingTime = 50000; //36000000;
    const now = Date.now();
    const time = waitingTime - (now - lastTime);

    if (time > 0) {
      await roleManager.addRole(user._id);
      setTimeout(async () => await roleManager.removeRole(user._id), time);
    } else {
      await roleManager.removeRole(user._id);
    }
  }
};
