const db = require("../db-layer/db");
const slim = require("../slim-id");
const result = require("./result");

async function create(user) {
	// Create new group data
	let groupId = slim.make();
	let newGroup = {
		id: groupId,
		name: "New Group",
		members: {
			user: "admin",
		},
	};

	// Add group to groups
	db.state.groups.data[groupId] = newGroup;

	// Add group to user index
	let userIndex = db.state.groups.userIndex;
	if (!userIndex[user]) {
		userIndex[user] = [];
	}
	userIndex[user].push(groupId);

	return result.success(groupId);
}

async function getUserGroups(user) {
	let groupIds = db.state.groups.userIndex[user];
	let groups = groupIds.map((group) => {
		let obj = {
			id: group,
			name: db.state.groups.data[group].name,
		};
		return obj;
	});
	return result.success(groups);
}

module.exports = {
	create,
	getUserGroups,
};
