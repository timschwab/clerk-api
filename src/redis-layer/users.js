const bcrypt = require('bcrypt');
const client = require('./redis-client.js');

const saltRounds = 10;

async function create(name, pass) {
	let userKey = 'user|' + name;
	let pass = await bcrypt.hash(pass, saltRounds);

	await client.set(userKey, pass);
}

module.exports.create = create;
