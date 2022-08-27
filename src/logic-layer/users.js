const bcrypt = require('bcrypt');
const db = require('../db-layer/db').state;
const tokens = require('./tokens');

const saltRounds = 10;

async function register(user, pass) {
	if (db.users[user]) {
		return false;
	}

	let hashed = await bcrypt.hash(pass, saltRounds);

	db.users[user] = {
		pass: hashed,
		tokens: Set()
	};

	return true;
}

async function authenticate(user, givenPass) {
	let storedPass = db.users[user].pass;

	if (!storedPass) {
		return false;
	}

	let match = await bcrypt.compare(givenPass, storedPass);

	return match;
}

async function login(name, pass) {
	let authenticated = await authenticate(name, pass);
	if (!authenticated) {
		return null;
	}

	let token = await tokens.newToken(name);
	return token;
}

module.exports = {
	register,
	authenticate,
	login
};
