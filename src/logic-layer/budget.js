const db = require("../db-layer/db");
const slim = require("../slim-id");
const result = require("./result");
const hooks = require("./hooks");

hooks.register("group-delete", deleteHook);
hooks.register("group-create", hookCreate);

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

async function userCreate(user, group) {
	let groups = db.state.groups;
	let groupData = groups.data[group];
	const authError = result.failure(
		"User does not have access to this group or it does not exist",
		"authorization"
	);

	// Check that the group exists
	if (!groupData) {
		return authError;
	}

	// Check that the user has access to group
	if (!groupData.members[user]) {
		return authError;
	}

	return await safeCreate(group);
}

async function hookCreate(param) {
	let group = param.group;
	return await safeCreate(group);
}

async function safeCreate(group) {
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

async function deleteHook(param) {
	// Get the values
	let group = param.group;
	let budgets = db.state.budgets;
	let budget = budgets.groupIndex[group];

	// Delete the budget
	delete budgets.groupIndex[group];
	delete budgets.data[budget];
}

async function safeGet(user, budgetId) {
	const errorResult = result.failure(
		"User can't delete group, or group doesn't exist"
	);

	// Check that the budget exists
	let budget = db.state.budgets.data[budgetId];
	if (!budget) {
		return errorResult;
	}

	// Get the group and make sure it exists
	let groupId = budget.group;
	let group = db.state.groups.data[groupId];
	if (!group) {
		throw {
			message: "Could not find budget's group",
			budget: budgetId,
			group: groupId
		};
	}

	// Validate the user is a member of the group
	if (!group.members[user]) {
		return errorResult;
	}

	return result.success(budget);
}

async function info(user, budgetId) {
	let budget = await safeGet(user, budgetId);
	return budget;
}

module.exports = {
	fromGroup,
	userCreate,
	info
};
