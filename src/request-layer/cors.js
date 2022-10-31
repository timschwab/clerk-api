function middleware(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "*");

	if (req.method == "OPTIONS") {
		res.status(200).send();
	} else {
		next();
	}
}

module.exports = middleware;
