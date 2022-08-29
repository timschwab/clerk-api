const express = require('express');
const router = express.Router();

const tokenHandler = require('../logic-layer/tokens');

router.post('/tokens/validate', validateRequest);

async function validateRequest(req, res) {
	let token = req.body.token;

	try {
		let success = await tokenHandler.validate(token);
		if (success) {
			res.send(200);
		} else {
			res.status(400).send({
				message: "Token not found"
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
