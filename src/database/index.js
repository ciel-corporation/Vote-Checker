const { connect } = require("mongoose");
const config = require("../config.json");

async function start() {
  const tokenData = config.tokenData;

  if (!tokenData) {
    throw new Error("Please insert the tokenData variable into the .env file");
  } else await connect(tokenData);

  console.log("Connected to database");
}

module.exports = {
  connect: start,
  User: require("./Schemas/User.js"),
};
