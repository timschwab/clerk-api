const bcrypt = require('bcrypt');
const db = require('../db-layer/db');
const slim = require("../slim-id");
const result = require("./result");
const tokens = require('./tokens');

const saltRounds = 12;

async function register(username, password) {
	// Validate the desired username
	if (db.state.users.index[username]) {
		return result.failure("Username already in use.");
	}

	// Create the id and hashed password
	let id = slim.make();
	let hashed = await bcrypt.hash(password, saltRounds);

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

async function login(username, password) {
	let user = await getId(username);
	if (!user) {
		return result.failure("Username not in use");
	}

	let authenticated = await authenticate(user, password);
	if (!authenticated.success) {
		return authenticated;
	}

	let token = await tokens.newToken(user);
	return result.success(token);
}

async function getId(username) {
	return db.state.users.index[username];
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

async function getInfo(user) {
	let info = db.state.users.data[user];
	if (info) {
		return result.success({
			id: info.id,
			username: info.username
		});
	} else {
		return result.failure("User does not exist.");
	}
}

async function changeUsername(id, newUsername) {
	// Get and validate the old username
	let oldUsername = db.state.users.data[id].username;
	if (oldUsername == newUsername) {
		return result.failure("The new username is the same as the old username");
	}

	// Validate the new username
	if (!newUsername) {
		return result.failure("Please specify a new username");
	}

	let newUser = await getId(newUsername);
	if (newUser) {
		return result.failure("Username already in use");
	}

	// Change the username in the data
	db.state.users.data[id].username = newUsername;
	
	// Change the username in the index
	db.state.users.index[newUsername] = id;
	delete db.state.users.index[oldUsername];

	// Return
	return result.success();
}

async function changePassword(id, newPassword) {
	let hashed = await bcrypt.hash(newPassword, saltRounds);
	db.state.users.data[id].password = hashed;
	return result.success();
}

module.exports = {
	register,
	authenticate,
	login,
	getInfo,
	changeUsername,
	changePassword
};
