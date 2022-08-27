// Includes
const fs = require('fs').promises;

// Vars
let state = {};
const dbFile = "/clerk/data/db.json";
const secondsBetweenSaves = 10;

// Setup
let readyPromise = loadState();
let saveInterval = setInterval(saveState, secondsBetweenSaves*1000);

// Functions
async function saveState() {
	const jsonStr = JSON.stringify(state);
	await fs.writeFile(dbFile, jsonStr);
}

async function loadState() {
	const jsonStr = await fs.readFile(dbFile, 'utf8');
	state = JSON.parse(jsonStr);
}

// Exports
module.exports = {
	ready: readyPromise,
	state
}
