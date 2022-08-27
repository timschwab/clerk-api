// Includes
const fs = require('fs').promises;

// Vars
let state = {
	users: {},
	tokens: {}
};
const dbFile = "/clerk/data/db.json";
const secondsBetweenSaves = 10;

// Setup
let readyPromise = loadState();
let saveInterval = setInterval(saveState, secondsBetweenSaves*1000);

// Functions
async function saveState() {
	const jsonStr = JSON.stringify(state);
	await fs.writeFile(dbFile, jsonStr);
	console.log("State saved - " + new Date().toISOString());
}

async function loadState() {
	try {
		const jsonStr = await fs.readFile(dbFile, 'utf8');
		state = JSON.parse(jsonStr);
	} catch (err) {
		// This is fine - it means the file doesn't exist.
	}
}

// Exports
module.exports = {
	ready: readyPromise,
	state
}
