function make() {
	return {
		tokens: {},
		users: {
			data: {},
			index: {}
		},
		groups: {
			data: {},
			userIndex: {}
		},
		budgets: {
			data: {},
			groupIndex: {}
		}
	};
}

module.exports = {
	make
};
