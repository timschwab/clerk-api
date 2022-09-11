function middleware(req, res, next) {
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

	next();
}

module.exports = middleware;
