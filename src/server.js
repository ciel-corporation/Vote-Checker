const express = require("express");
const app = express();

(async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get("/", (req, res) => res.sendStatus(200)); // receive pings

  await require("./webhooks/")(app);

  await app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
  });
})();
