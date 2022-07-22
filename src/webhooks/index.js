const { readdirSync } = require("fs");
const path = require("path");

module.exports = (app) => {
  readdirSync("./src/webhooks/")
    .filter((x) => x !== "index.js")
    .forEach((folder) =>
      readdirSync(`./src/webhooks/${folder}/`).forEach((file) =>
        require(path.resolve(__dirname, folder, file))(app)
      )
    );
};
