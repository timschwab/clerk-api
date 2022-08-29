const bcrypt = require('bcrypt');
const db = require('../db-layer/db');
const tokens = require('./tokens');

const saltRounds = 10;

setup();
async function setup() {
	await db.ready;
	if (!db.state.users) {
		db.state.users = {};
	}
}

async function register(user, pass) {
	if (db.state.users[user]) {
		return false;
	}

	let hashed = await bcrypt.hash(pass, saltRounds);

	db.state.users[user] = {
		pass: hashed
	};

	return true;
}

async function authenticate(user, givenPass) {
	let storedPass = db.state.users[user].pass;

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
