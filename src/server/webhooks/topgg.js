const { UserSchema } = require("ciel-utils");
const roleManager = require("../../utils/roleManager.js");
const { thankYouMessage } = require("../../utils/");

module.exports = {
  async bot(req, res) {
    const { user, isWeekend } = req.body;
    const wishes = isWeekend ? 2 : 1;
    const coins = isWeekend ? 2000 : 1000;

    await UserSchema.findByIdAndUpdate(
      user,
      {
        $inc: { "wishes.bot.topgg": wishes, "balance.coins": coins },
        "cooldowns.wishes.topgg_bot": Date.now(),
      },
      { upsert: true, new: true }
    );

    await thankYouMessage(user);
    res.sendStatus(200);
  },

  async server(req, res) {
    const { user, isWeekend } = req.body;
    const wishes = isWeekend ? 2 : 1;
    const coins = isWeekend ? 2000 : 1000;

    await UserSchema.findByIdAndUpdate(user, {
      $inc: { "wishes.server.topgg": wishes, "balance.coins": coins },
      "cooldowns.wishes.topgg_server": Date.now(),
    }, { upsert: true, new: true });
    
    await roleManager.addRole(user);
    await thankYouMessage(user);
    res.sendStatus(200);
  },
};
