const { connect } = require("mongoose");
const config = require("../config.json");

async function start() {
  const { dataToken } = config;

  if (!dataToken) {
    throw new Error("Please insert the dataToken variable into the .env file");
  } else await connect(dataToken);

  console.log("Connected to database");
}

module.exports = {
  connect: start,
  //User: require("./Schemas/User.js"),
  //Wishe: require("./Schemas/Wishe.js")
};
