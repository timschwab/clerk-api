// Includes
const fs = require('fs').promises;
const logger = require("../logger");
let initialize = require("./initialize");

// Vars
const dbFile = "/clerk/data/db.json";
const secondsBetweenSaves = 15;

// Exports object
let exportWrapper = {
	state: undefined,
	ready: undefined
};

// Setup
exportWrapper.ready = loadState();
setInterval(saveState, secondsBetweenSaves*1000);

// Saving and loading
async function saveState() {
	const jsonStr = JSON.stringify(exportWrapper.state, null, 2);
	await fs.writeFile(dbFile, jsonStr);
	logger.info("State saved");
}

async function loadState() {
	let state = {};

	try {
		const jsonStr = await fs.readFile(dbFile, 'utf8');
		state = JSON.parse(jsonStr);
	} catch (err) {
		// This is fine - it means the file doesn't exist.
	}

	exportWrapper.state = initialize.initState(state);
}

// Export
module.exports = exportWrapper;
