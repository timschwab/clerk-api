const express = require('express');
const router = express.Router();

router.use(express.json());

// 404
router.use((req, res, next) => {
	res.status(404).send({
		message: 'failure',
		details: 'Route not found'
	});
});

module.exports = router;
