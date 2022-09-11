const slim = require("../slim-id");
const tokens = require("../logic-layer/tokens");

async function middleware(req, res, next) {
	const header = req.get("Authorization");
	let token = null;
	let user = null;

	token = getToken(header);

	if (token) {
		user = await getUser(token);
		if (!user) {
			token = null;
		}
	}

	req.auth = {
		token,
		user
	};

	next();
}

function getToken(header) {
	const prefix = "Bearer ";

	if (!header) {
		return null;
	} else if (!header.startsWith(prefix)) {
		return null;
	}

	let token = header.slice(prefix.length);
	if (!slim.validate(token)) {
		return null;
	}

	return token;
}

async function getUser(token) {
	let result = await tokens.getUser(token);
	if (result.success) {
		return result.return;
	} else {
		return null;
	}
}

module.exports = middleware;
