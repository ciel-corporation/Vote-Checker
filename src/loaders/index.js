const fs = require("fs");
const path = require("path");

async function Main(client) {
  fs.readdirSync(__dirname)
    .filter((file) => file !== "index.js")
    .forEach(
      async (loader) => await require(path.resolve(__dirname, loader))(client)
    );
}

module.exports = Main;
