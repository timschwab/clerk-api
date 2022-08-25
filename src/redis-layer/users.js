const bcrypt = require('bcrypt');
const client = require('./redis-client.js');

const auth = require("./auth");

const saltRounds = 10;

function redisKey(name) {
	return 'user|' + name;
}

async function create(name, pass) {
	let nameKey = redisKey(name);

	if (await client.get(userKey)) {
		throw new Error('`' + name + '` already exists.');
	}

	let hashed = await bcrypt.hash(pass, saltRounds);

	await client.set(nameKey, hashed);
}

async function authenticate(name, givenPass) {
	let nameKey = redisKey(name);
	let storedPass = await client.get(nameKey);
	let match = await bcrypt.compare(givenPass, storedPass);

	return match;
}

async function login(name, pass) {
	let authenticated = await authenticate(name, pass);
	if (!authenticated) {
		throw "Could not authenticate credentials";
	}

	let token = await auth.newToken(name);
	return token;
}

module.exports = {
	create,
	authenticate,
	login
};
