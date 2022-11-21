const logger = require("../logger");

// Malformed JSON
function errorJson(err, req, res, next) {
	if (err instanceof SyntaxError && err.status == 400) {
		res.status(400).send({
			success: false,
			message:
				"Would you kindly stop sending me malformed JSON, please and thank you."
		});
	} else {
		next();
	}
}

// 404
function error404(req, res, next) {
	res.status(404).send({
		success: false,
		message: "Route not found"
	});
}

// 500
function error500(err, req, res, next) {
	logger.error(err.stack);
	res.status(500).send();
}

module.exports = {
	errorJson,
	error404,
	error500
};
