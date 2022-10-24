const logger = require("../logger");
const wrapped = require("./wrappedRouter");
const router = wrapped.make();

const groupHandler = require("../logic-layer/groups");

router.post("/groups/create", create);
router.get("/groups/my", myGroups);
router.get("/groups/get/:group", getGroup);

async function create(req, res) {
	let user = req.auth.user;

	if (user) {
		let group = await groupHandler.create(user);
		res.status(200).send({
			group: group.return,
		});
	} else {
		res.status(401).send();
	}
}

async function myGroups(req, res) {
	let user = req.auth.user;

	if (user) {
		let groups = await groupHandler.getUserGroups(user);
		res.status(200).send({
			groups: groups.return,
		});
	} else {
		res.status(401).send();
	}
}

async function getGroup(req, res) {
	let user = req.auth.user;
	let group = req.params.group;

	if (user) {
		let groupData = await groupHandler.getGroup(user, group);
		if (groupData.success) {
			res.status(200).send({
				group: groupData.return,
			});
		} else {
			res.status(403).send(groupData);
		}
	} else {
		res.status(401).send();
	}
}

module.exports = router.router;
