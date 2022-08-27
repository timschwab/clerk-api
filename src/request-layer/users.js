const express = require('express');
const router = express.Router();

const usersHandler = require('../logic-layer/users');

router.post('/users/register', registerRequest);
router.post('/users/login', loginRequest);

async function registerRequest(req, res) {
	let name = req.body.name;
	let pass = req.body.pass;

	try {
		let success = await usersHandler.register(name, pass);
		if (success) {
			res.send({
				message: 'created'
			});
		} else {
			res.status(400).send({
				message: "User already exists"
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: 'failure'
		});
	}
}

async function loginRequest(req, res) {
	let name = req.body.name;
	let pass = req.body.pass;

	try {
		let token = await usersHandler.login(name, pass);
		if (token) {
			res.send({
				token: token
			});
		} else {
			res.status(401).send({
				message: "Could not authenticate user"
			});
		}
	} catch (err) {
		res.status(500).send({
			message: "Could not log in.",
			details: err
		});
	}
}

module.exports = router;
