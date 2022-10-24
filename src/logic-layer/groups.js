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
			[user]: "admin"
		}
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
				name: db.state.groups.data[group].name
			};
			return obj;
		});
	} else {
		groups = [];
	}

	return result.success(groups);
}

async function info(user, group) {
	let groupData = db.state.groups.data[group];
	if (groupData.members[user]) {
		let info = {
			id: groupData.id,
			name: groupData.name,
			role: groupData.members[user]
		};
		return result.success(info);
	} else {
		result.failure("User cannot view group, or group does not exist");
	}
}

async function changeName(user, group, newName) {
	let groupData = db.state.groups.data[group];
	if (groupData.members[user] == "admin") {
		groupData.name = newName;
		return result.success();
	} else {
		result.failure("User cannot change group's name");
	}
}

async function deleteGroup(user, group) {
	let groups = db.state.groups;
	let groupData = groups.data[group];
	if (groupData.members[user] == "admin") {
		// Remove group from user indices
		for (let user of Object.keys(groupData.members)) {
			groups.userIndex[user] = groups.userIndex[user].filter(
				(val) => val != group
			);
		}

		// Remove group from groups
		delete groups.data[group];

		return result.success();
	} else {
		result.failure("User cannot change group's name");
	}
}

module.exports = {
	create,
	getUserGroups,
	info,
	changeName,
	deleteGroup
};
