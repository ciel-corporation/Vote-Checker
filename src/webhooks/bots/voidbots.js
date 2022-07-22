const User = require("../../database/Schemas/User");
const config = require("../../config.json");
const postman = require("../../modules/postMan.js");

async function Voidbots(req, res) {
  try {
    if (req.header("Authorization") !== config.VOIDBOTS_AUTH_TOKEN) {
      return res.sendStatus("401");
    }

    await User.findByIdAndUpdate(req.body.user, {
      $inc: { "wishes.bot_void": 1, "balance.coins": 1000 },
      "cooldowns.bot_void": Date.now(),
    });

    await postman(`<@${req.body.user}> obrigado por votar`);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.send({ error: "Unable to register vote!" });
  }
}

module.exports = (app) => app.post("/botVoidbots", Voidbots);
