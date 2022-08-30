const bcrypt = require('bcrypt');
const db = require('../db-layer/db');
const result = require("./result");
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
		return result.failure("User already exists.");
	}

	let hashed = await bcrypt.hash(pass, saltRounds);

	db.state.users[user] = {
		pass: hashed
	};

	return result.success();
}

async function authenticate(user, givenPass) {
	let storedUser = db.state.users[user];

	if (!storedUser) {
		return false;
	}

	let match = await bcrypt.compare(givenPass, storedUser.pass);

	if (match) {
		return true;
	} else {
		return false;
	}
}

async function login(name, pass) {
	let authenticated = await authenticate(name, pass);
	if (!authenticated) {
		return result.failure("Could not authenticate.");
	}

	let token = await tokens.newToken(name);
	return result.success(token);
}

module.exports = {
	register,
	authenticate,
	login
};
