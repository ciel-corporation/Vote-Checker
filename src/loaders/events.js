const { readdirSync } = require("fs");

async function Events(client) {
  const events = readdirSync("./src/events/");

  for (const file of events) {
    const event = require(`../events/${file}`);
    const eventName = file.split(".")[0];

    if (eventName === "ready") {
      client.once("ready", event.bind(null, client));
    } else {
      client.on(eventName, event.bind(null, client));
    }

    delete require.cache[require.resolve(`../events/${eventName}`)];
  }
  console.log("[EVENTS] - All events have been loaded");
}

module.exports = Events;
