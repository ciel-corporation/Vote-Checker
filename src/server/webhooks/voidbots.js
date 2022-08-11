const { UserSchema } = require("ciel-utils");
const { thankYouMessage } = require("../../utils/");

module.exports = {
  async bot(req, res) {
    const user = req.body.user;

    await UserSchema.findByIdAndUpdate(user, {
      $inc: { "wishes.bot.voidbots": 1, "balance.coins": 1000 },
      "cooldowns.wishes.voidbots_bot": Date.now(),
    });

    await thankYouMessage(user);
    res.sendStatus(200);
  },

  async server(req, res) {
    res.sendStatus(200);
  },
};
