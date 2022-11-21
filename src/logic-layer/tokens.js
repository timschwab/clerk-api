const logger = require("../logger");
const db = require("../db-layer/db");
const slim = require("../slim-id");
const result = require("./result");

const daysTokensLast = 30;
const secondsBetweenExpireChecks = 60;

async function newToken(user) {
	let token = slim.make();
	let tomorrow = new Date();
	tomorrow.setDate(new Date().getDate() + daysTokensLast);

	let object = {
		token: token,
		user: user,
		expire: tomorrow.toISOString()
	};

	db.state.tokens[token] = object;

	return token;
}

async function getUser(token) {
	let tokenObject = db.state.tokens[token];
	if (tokenObject) {
		return result.success(tokenObject.user);
	} else {
		return result.failure("Token doesn't exist.");
	}
}

async function validate(token) {
	if (db.state.tokens[token]) {
		return true;
	} else {
		return false;
	}
}

async function deleteToken(token) {
	delete db.state.tokens[token];
}

setInterval(expireTokens, secondsBetweenExpireChecks * 1000);
async function expireTokens() {
	// Loop through and remove them (This should be a queue implementation obvs.)
	let now = new Date();
	for (let token of Object.values(db.state.tokens)) {
		let expire = new Date(token.expire);
		if (expire < now) {
			await deleteToken(token.token);
		}
	}
	logger.info("Tokens expired");
}

module.exports = {
	newToken,
	getUser,
	validate
};
