const secondsInADay = 60 * 60 * 24;

function middleware(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Authorization, *");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Max-Age", secondsInADay);

	if (req.method == "OPTIONS") {
		res.status(204).send();
	} else {
		next();
	}
}

module.exports = middleware;
