const express = require('express');
const router = express.Router();
const logger = require("./logger");
const slim = require("./slim-id");

// Add CORS
router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

// Parse json
router.use(express.json());

// Extract auth header and put it on the req
router.use(function (req, res, next) {
	const prefix = "Bearer ";
	let token = null;

	let header = req.get("Authorization");
	if (!header) {
		token = null;
	} else if (!header.startsWith(prefix)) {
		token = null;
	} else {
		token = header.slice(prefix.length);
		if (!slim.validate(token)) {
			token = null;
		}
	}

	req.auth = token;

	next();
});

// The actual main routes
router.use(require('./request-layer/users'));
router.use(require('./request-layer/tokens'));

// 404
router.use(function (req, res, next) {
	res.status(404).send({
		message: 'failure',
		details: 'Route not found'
	});
});

// 500
router.use(function (err, req, res, next) {
	logger.error(err.stack);
	res.status(500).send();
});

module.exports = router;
