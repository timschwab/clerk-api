// Includes
const fs = require('fs').promises;

// Vars
const dbFile = "/clerk/data/db.json";
const secondsBetweenSaves = 10;

// Exports object
module.exports = {
	state: undefined,
	ready: false
};

// Setup
exports.ready = loadState();
let saveInterval = setInterval(saveState, secondsBetweenSaves*1000);

// Saving and loading
async function saveState() {
	const jsonStr = JSON.stringify(module.exports.state);
	await fs.writeFile(dbFile, jsonStr);
	console.log("State saved - " + new Date().toISOString());
}

async function loadState() {
	try {
		const jsonStr = await fs.readFile(dbFile, 'utf8');
		module.exports.state = JSON.parse(jsonStr);
	} catch (err) {
		// This is fine - it means the file doesn't exist.
		module.exports.state = {};
	}
}
