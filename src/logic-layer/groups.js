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
	let groups;
	let groupIds = db.state.groups.userIndex[user];

	if (groupIds) {
		groups = groupIds.map((group) => {
			let obj = {
				id: group,
				name: db.state.groups.data[group].name,
			};
			return obj;
		});
	} else {
		groups = [];
	}

	return result.success(groups);
}

async function getGroup(user, group) {
	let index = db.state.groups.userIndex[user];
	if (index) {
		if (index.contains(group)) {
			let groupData = db.state.groups.data[groupId];
			return result.success(groupData);
		} else {
			result.failure("User cannot view group, or group does not exist");
		}
	} else {
		return result.failure("User has no groups");
	}
}

module.exports = {
	create,
	getUserGroups,
	getGroup,
};
