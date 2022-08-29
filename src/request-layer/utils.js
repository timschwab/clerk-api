function extractToken(req) {
	const prefix = "Bearer ";

	let header = req.get("Authorization");
	if (!header) {
		return null;
	}

	if (!header.startsWith(prefix)) {
		return null;
	}

	return header.slice(prefix.length);
}

module.exports = {
	extractToken
};
