function now() {
	let nowDate = new Date();
	return nowDate.toISOString();
}

async function info(message) {
	console.info(now() + "|" + message);
}

async function warn(message) {
	console.warn(now() + "|" + message);
}

async function error(message) {
	console.error(now() + "|" + message);
}

module.exports = {
	info,
	warn,
	error
};
