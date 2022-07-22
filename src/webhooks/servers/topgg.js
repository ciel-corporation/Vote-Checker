const roleManager = require("../../modules/roleManager.js");
const config = require("../../config.json");
const postman = require("../../modules/postMan.js");

async function Topgg(req, res) {
  try {
    const password = req.headers.authorization;
    if (password !== config.TOPGG_AUTH_TOKEN) return res.sendStatus("401");
    const userId = req.body.user;

    await roleManager.addRole(userId);
    setTimeout(async () => await roleManager.removeRole(userId), 60000);

    await postman(`<@${userId}> obrigado por tedo votado`);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.send({ error: "Unable to register vote!" });
  }
}

module.exports = (app) => app.post("/serverTopgg", Topgg);
