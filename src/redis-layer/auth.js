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

async function getUser(token) {
	let key = redisKey(token);

	let user = await client.get(key);

	return user;
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
