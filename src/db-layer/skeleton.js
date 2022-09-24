function make() {
	return {
		tokens: {},
		users: {
			data: {},
			index: {},
		},
		groups: {
			data: {},
			userIndex: {},
		},
	};
}

module.exports = {
	make,
};
