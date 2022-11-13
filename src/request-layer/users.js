const logger = require("../logger");
const wrapped = require("./wrappedRouter");
const router = wrapped.make();

const usersHandler = require("../logic-layer/users");

router.post("/users/register", registerRequest);
router.post("/users/login", loginRequest);
router.get("/users/info", infoRequest);
router.post("/users/changeUsername", changeUsername);
router.post("/users/changePassword", changePassword);

async function registerRequest(req, res) {
	let name = req.body.name;
	let pass = req.body.pass;

	let result = await usersHandler.register(name, pass);
	if (result.success) {
		res.status(200).send();
	} else {
		res.status(400).send(result.message);
	}
}

async function loginRequest(req, res) {
	let name = req.body.name;
	let pass = req.body.pass;

	let result = await usersHandler.login(name, pass);
	if (result.success) {
		res.status(200).send(result.return);
	} else {
		res.status(401).send();
	}
}

async function infoRequest(req, res) {
	let user = req.auth.user;
	logger.info("Getting info for: " + user);

	let info = await usersHandler.getInfo(user);
	if (info.success) {
		res.status(200).send(info.return);
	} else {
		res.status(401).send();
	}
}

async function changeUsername(req, res) {
	let user = req.auth.user;
	let username = req.body.username;

	if (!user) {
		res.status(401).send();
		return;
	}

	let result = await usersHandler.changeUsername(user, username);
	if (result.success) {
		res.status(200).send();
	} else {
		res.status(400).send({
			message: result.message
		});
	}
}

async function changePassword(req, res) {
	let user = req.auth.user;
	let password = req.body.password;

	if (!user) {
		res.status(401).send();
		return;
	}

	let result = await usersHandler.changePassword(user, password);
	if (result.success) {
		res.status(200).send();
	} else {
		res.status(400).send({
			message: result.message
		});
	}
}

module.exports = router.router;
