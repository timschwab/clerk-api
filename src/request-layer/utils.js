function extractToken(req) {
	const prefix = "Bearer ";

	let header = req.get("Authorization");
	if (!header) {
		throw "Missing header";
	}

	if (!header.startsWith(prefix)) {
		throw "Badly formatted header";
	}

	return header.slice(prefix.length);
}

module.exports = {
	extractToken
};
