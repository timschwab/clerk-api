const express = require('express');
const router = express.Router();

const utils = require("./utils");
const budgetHandler = require('../redis-layer/budget');

router.post('/budget/revenue', setRevenue);
router.get('/budget/revenue', getRevenue);

async function setRevenue(req, res) {
	let revenue = req.body.revenue;
	let token = utils.extractToken(req);

	await budgetHandler.setRevenue(token, revenue);

	res.send({
		message: 'set'
	});
}

async function getRevenue(req, res) {
	let token = utils.extractToken(req);

	let revenue = budgetHandler.getRevenue(token);

	res.send({
		revenue
	});
}

module.exports = router;
