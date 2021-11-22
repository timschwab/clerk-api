const client = require('./redis-client.js');

async function create(name, pass) {
	await client.set(name, pass);
}

module.exports.create = create;
