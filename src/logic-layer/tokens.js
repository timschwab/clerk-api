const uuid = require("uuid");
const db = require('../db-layer/db').state;

async function newToken(user) {
	let token = uuid.v4();

	db.tokens[token] = user;
	db.users[user].tokens.add(token);

	return token;
}

async function getUser(token) {
	return db.tokens[token];
}

async function validatePair(token, givenUser) {
	let storedUser = await getUser(token);
	return (givenUser == storedUser);
}

module.exports = {
	newToken,
	getUser,
	validatePair
};