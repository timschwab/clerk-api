const client = require('./redis-client.js');

const auth = require("./auth");

function rootKey(name) {
	return "budget|" + name;
}

function revKey(user) {
	return rootKey("revenue|" + user);
}

async function setRevenue(token, revenue) {
	let user = auth.getUser(token);
	if (!user) {
		throw "Could not authenticate user";
	}

	let key = revKey(user);
	await client.set(key, revenue);
}

async function getRevenue(token) {
	let user = auth.getUser(token);
	if (!user) {
		throw "Could not authenticate user";
	}

	let key = revKey(user);
	let revenue = await client.get(key);
	return revenue;
}

module.exports = {
	setRevenue,
	getRevenue
};
