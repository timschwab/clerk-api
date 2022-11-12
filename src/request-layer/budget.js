const wrapped = require("./wrappedRouter");
const router = wrapped.make();

const budgetHandler = require("../logic-layer/budget");

router.get("/budget/fromGroup/:group", fromGroup);
router.post("/budget/create/:group", create);

router.get("/budget/:budget", info);

async function fromGroup(req, res) {
	let user = req.auth.user;
	let group = req.params.group;

	if (user) {
		let result = await budgetHandler.fromGroup(user, group);
		if (result.success) {
			res.status(200).send({
				id: result.return
			});
		} else {
			res.status(403);
		}
	} else {
		res.status(401).send();
	}
}

async function create(req, res) {
	let user = req.auth.user;
	let group = req.params.group;

	if (user) {
		let result = await budgetHandler.create(user, group);
		if (result.success) {
			res.status(200).send({
				id: result.return
			});
		} else {
			if (result.type == "authorization") {
				res.status(403).send(result);
			} else if (result.type == "already-exists") {
				res.status(400).send(result);
			} else {
				res.status(500);
			}
		}
	} else {
		res.status(401).send();
	}
}

async function info(req, res) {
	let user = req.auth.user;
	let budget = req.params.budget;

	if (user) {
		let result = await budgetHandler.info(user, budget);
		if (result.success) {
			res.status(200).send({
				budget: result.return
			});
		} else {
			res.status(403);
		}
	} else {
		res.status(401).send();
	}
}

module.exports = router.router;
