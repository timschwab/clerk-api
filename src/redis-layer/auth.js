const uuid = require("uuid");
const client = require('./redis-client.js');

const secondsInADay = 60*60*24;

function redisKey(token) {
	return 'token|' + token;
}

async function newToken(user) {
	let token = uuid.v4();
	let key = redisKey(token);

	await client.set(key, user, {
		EX: secondsInADay
	});

	return token;
}

async function getToken(token) {
	let key = redisKey(token);

	let user = client.get(key);

	return user;
}

module.exports = {
	newToken,
	getToken
};
