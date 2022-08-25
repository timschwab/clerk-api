const express = require('express');
const router = express.Router();

const usersHandler = require('../redis-layer/users');

router.post('/users/create', createRequest);
router.post('/users/login', loginRequest);

async function createRequest(req, res) {
	let name = req.body.name;
	let pass = req.body.pass;

	await usersHandler.create(name, pass);

	res.send({
		message: 'created'
	});
}

async function loginRequest(req, res) {
	let name = req.body.name;
	let pass = req.body.pass;

	let token = await usersHandler.login(name, pass);

	res.send({
		token
	});
}

module.exports = router;
