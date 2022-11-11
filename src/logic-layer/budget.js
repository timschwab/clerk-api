const db = require("../db-layer/db");
const result = require("./result");

async function fromGroup(user, group) {
	let groups = db.state.groups;
	let groupData = groups.data[group];
	const errorResult = result.failure(
		"User does not have access to this group or it does not exist"
	);

	// Check that group exists
	if (!groupData) {
		return errorResult;
	}

	// Check that the user has access to group
	if (!groupData.members[user]) {
		return errorResult;
	}

	// Get the budget corresponding to the group (even if it doesn't exist)
	let budgets = db.state.budgets;
	let budget = budgets[group] || null;
	return result.success(budget);
}

module.exports = {
	fromGroup
};
