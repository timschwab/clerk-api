const uuid = require("uuid");
const db = require('../db-layer/db');

async function newToken(user) {
	let token = uuid.v4();

	db.state.tokens[token] = user;
	db.state.users[user].tokenIndex[token] = true;

	return token;
}

async function getUser(token) {
	return db.state.tokens[token];
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