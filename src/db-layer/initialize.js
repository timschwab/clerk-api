const skelly = require("./skeleton");

function initState(state) {
	let expected = skelly.make();

	apply(state, expected);

	return state;
}

function apply(state, expected) {
	if (!state) {
		return expected;
	}

	for (let childProp of Object.keys(expected)) {
		state[childProp] = apply(state[childProp], expected[childProp]);
	}

	return state;
}

module.exports = {
	initState
}
