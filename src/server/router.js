const { Router } = require("express");
const config = require("../config.json");
const client = require("../index.js");
const router = Router();

router.post("/webhooks/:domain/:type", async (req, res) => {
	try {
		const { domain, type } = req.params;

		const password = req.headers.authorization;
		const rightPassword = config[`${domain.toUpperCase()}_${type.toUpperCase()}_TOKEN`];
		if (password !== rightPassword) return res.sendStatus("401");

		const { webhooks } = client;
		if (!webhooks[domain])
			return res.send({ error: "This domain is not registered!" });
		else if (!webhooks[domain][type])
			return res.send({ error: "This type is not registered!" });
		else webhooks[domain][type](req, res);
	} catch (err) {
		res.send({ error: "There was an error when trying to register!" });
		console.log(err.stack);
	}
});

module.exports = router;
