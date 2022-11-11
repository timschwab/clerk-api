const wrapped = require("./wrappedRouter");
const router = wrapped.make();

const budgetHandler = require("../logic-layer/budget");

router.get("/budget/fromGroup/:group", fromGroup);

async function fromGroup(req, res) {
	let user = req.auth.user;
	let group = req.params.group;

	if (user) {
		let result = await budgetHandler.fromGroup(user, group);
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
