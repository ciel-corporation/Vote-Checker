const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.sendStatus(200));
app.use(require("./router.js"));

module.exports = app;
