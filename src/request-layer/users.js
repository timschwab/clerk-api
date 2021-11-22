const express = require('express');
const router = express.Router();

const usersHandler = require('../redis-layer/users.js');

router.post('/users/create', createRequest);

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

module.exports = router;
