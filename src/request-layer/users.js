const wrapped = require("./wrappedRouter");
const router = wrapped.make();

const usersHandler = require('../logic-layer/users');

router.post('/users/register', registerRequest);
router.post('/users/login', loginRequest);
router.get("/users/info", infoRequest);

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
		res.status(200).send({
			token: result.return
		});
	} else {
		res.status(401).send();
	}
}

async function infoRequest(req, res) {
	let user = req.auth.user;
	let info = usersHandler.getInfo(user);
	if (info.success) {
		res.status(200).send(info.return);
	} else {
		res.status(401).send();
	}
}

module.exports = router.router;
