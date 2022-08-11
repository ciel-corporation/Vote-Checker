const client = require("../index.js");
const fs = require("fs");

async function Webhooks() {
  const webhooks = {};

  fs.readdirSync("./src/server/webhooks/").forEach((file) => {
    const fileObject = require(`../server/webhooks/${file}`);
    const filename = file.split(".")[0];

    webhooks[filename] = fileObject;
  });

  client.webhooks = webhooks;
}

module.exports = Webhooks;
