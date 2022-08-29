const uuid = require("uuid");
const db = require('../db-layer/db');
const secondsBetweenExpireChecks = 60;

setup();
async function setup() {
	await db.ready;
	if (!db.state.tokens) {
		db.state.tokens = {};
	}
}

async function newToken(user) {
	let token = uuid.v4();
	let tomorrow = new Date();
	tomorrow.setDate(new Date().getDate() + 1);

	let object = {
		token: token,
		user: user,
		expire: tomorrow.toISOString()
	};

	db.state.tokens[token] = object;

	return token;
}

async function getUser(token) {
	return db.state.tokens[token];
}

async function validate(token) {
	if (db.state.tokens[token]) {
		return true;
	} else {
		return false;
	}
}

setInterval(expireTokens, secondsBetweenExpireChecks*1000);
async function expireTokens() {
	// Loop through and remove them (This should be a queue implementation obvs.)
	let now = new Date();
	for (let token of Object.items(db.state.tokens)) {
		let expire = new Date(token.expire);
		if (expire < now) {
			delete db.state.tokens[token];
		}
	}
}

module.exports = {
	newToken,
	getUser,
	validate
};