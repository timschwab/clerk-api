const express = require('express');
const router = express.Router();

// Add CORS
router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

router.use(express.json());

router.use(require('./request-layer/users'));
router.use(require('./request-layer/tokens'));

// 404
router.use((req, res, next) => {
	res.status(404).send({
		message: 'failure',
		details: 'Route not found'
	});
});

module.exports = router;
