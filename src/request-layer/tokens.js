const express = require('express');
const router = express.Router();

const tokenHandler = require('../logic-layer/tokens');
const utils = require("./utils");

router.get('/tokens/validate', validateRequest);

async function validateRequest(req, res) {
	let token = utils.extractToken(req);

	try {
		let success = await tokenHandler.validate(token);
		if (success) {
			res.send(200);
		} else {
			res.status(401).send({
				message: "Could not authenticate"
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: 'Server failure'
		});
	}
}

module.exports = router;
