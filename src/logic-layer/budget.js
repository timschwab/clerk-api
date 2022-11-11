const db = require("../db-layer/db");
const slim = require("../slim-id");
const result = require("./result");

async function fromGroup(user, group) {
	let groups = db.state.groups;
	let groupData = groups.data[group];
	const errorResult = result.failure(
		"User does not have access to this group or it does not exist"
	);

	// Check that the group exists
	if (!groupData) {
		return errorResult;
	}

	// Check that the user has access to group
	if (!groupData.members[user]) {
		return errorResult;
	}

	// Get the budget corresponding to the group (even if it doesn't exist)
	let budgets = db.state.budgets;
	let budget = budgets.groupIndex[group] || null;
	return result.success(budget);
}

async function create(user, group) {
	let groups = db.state.groups;
	let groupData = groups.data[group];
	const groupError = result.failure(
		"User does not have access to this group or it does not exist",
		"authorization"
	);

	// Check that the group exists
	if (!groupData) {
		return groupError;
	}

	// Check that the user has access to group
	if (!groupData.members[user]) {
		return groupError;
	}

	// Make sure the budget doesn't already exist
	let budgets = db.state.budgets;
	if (budgets.groupIndex[group]) {
		return result.failure("Group already has a budget", "already-exists");
	}

	// Make the budget
	let id = slim.make();
	let newBudget = {
		id: id,
		group: group
	};

	budgets.data[id] = newBudget;
	budgets.groupIndex[group] = id;

	return result.success(id);
}

module.exports = {
	fromGroup,
	create
};
