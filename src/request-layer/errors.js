const logger = require("./logger");

// 404
function error404(req, res, next) {
	res.status(404).send({
		message: 'failure',
		details: 'Route not found'
	});
};

// 500
function error500(err, req, res, next) {
	logger.error(err.stack);
	res.status(500).send();
};

module.exports = {
	error404,
	error500
};
