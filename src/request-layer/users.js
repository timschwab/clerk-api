const express = require('express');
const router = express.Router();

const usersHandler = require('../redis-layer/users');

router.post('/users/create', createRequest);
router.post('/users/login', loginRequest);

async function createRequest(req, res) {
	let name = req.body.name;
	let pass = req.body.pass;

	try {
		await usersHandler.create(name, pass);

		res.send({
			message: 'created'
		});
	} catch (err) {
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
			res.send(401).send({
				message: "Could not authenticate user"
			})
		}
	} catch (err) {
		res.status(500).send({
			message: "Could not log in.",
			details: err
		});
	}
}

module.exports = router;
