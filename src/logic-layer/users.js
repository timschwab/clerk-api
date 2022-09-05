const bcrypt = require('bcrypt');
const db = require('../db-layer/db');
const slim = require("../slim-id");
const result = require("./result");
const tokens = require('./tokens');

const saltRounds = 12;

setup();
async function setup() {
	await db.ready;
	if (!db.state.users) {
		db.state.users = {};
	}

	if (!db.state.users.index) {
		db.state.users.index = {};
	}

	if (!db.state.users.data) {
		db.state.users.data = {};
	}
}

async function register(username, password) {
	// Validate the desired username
	if (db.state.users.index[username]) {
		return result.failure("Username already in use.");
	}

	// Create the id and hashed password
	let hashed = await bcrypt.hash(password, saltRounds);
	let id = slim.make();

	// Set the core data
	db.state.users.data[id] = {
		id: id,
		username: username,
		password: hashed
	};

	// Set the index of username to id
	db.state.users.index[username] = id;

	return result.success();
}

async function get(username) {
	let id = db.state.users.index[username];
	if (!id) {
		return result.failure("Username not in use.");
	} else {
		return result.success(id);
	}
}

async function authenticate(user, givenPass) {
	let storedUser = db.state.users.data[user];

	if (!storedUser) {
		return result.failure("User does not exist.");
	}

	let match = await bcrypt.compare(givenPass, storedUser.password);

	if (match) {
		return result.success();
	} else {
		return result.failure("Given password does not match stored password.");
	}
}

async function login(username, password) {
	let id = await get(username);
	if (!id.success) {
		return id;
	}

	let authenticated = await authenticate(id.return, password);
	if (!authenticated.success) {
		return authenticated;
	}

	let token = await tokens.newToken(id.return);
	return result.success(token);
}

module.exports = {
	register,
	authenticate,
	login
};
