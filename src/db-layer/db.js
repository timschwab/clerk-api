// Includes
const fs = require('fs').promises;

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
	const jsonStr = JSON.stringify(exportWrapper.state);
	await fs.writeFile(dbFile, jsonStr);
	console.log("State saved - " + new Date().toISOString());
}

async function loadState() {
	try {
		const jsonStr = await fs.readFile(dbFile, 'utf8');
		exportWrapper.state = JSON.parse(jsonStr);
	} catch (err) {
		// This is fine - it means the file doesn't exist.
		exportWrapper.state = {};
	}
}

// Export
module.exports = exportWrapper;
