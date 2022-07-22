const { User } = require("../../database/");
const config = require("../../config.json");

const postman = require("../../modules/postMan.js");

async function Topgg(req, res) {
  try {
    const password = req.headers.authorization;
    if (password !== config.TOPGG_AUTH_TOKEN) return res.sendStatus("401");

    const { user, isWeekend } = req.body;
    const wishes = isWeekend ? 2 : 1;
    const coins = isWeekend ? 2000 : 1000;

    await User.findByIdAndUpdate(user, {
      $inc: { "wishes.bot_topgg": wishes, "balance.coins": coins },
      "cooldowns.bot_topgg": Date.now(),
    });

    await postman(`<@${user}> obrigado por tedo votado!`);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.send({ error: "Unable to register vote!" });
  }
}

module.exports = (app) => app.post("/botTopgg", Topgg);
