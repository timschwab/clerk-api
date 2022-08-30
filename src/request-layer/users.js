const wrapped = require("./wrappedRouter");
const router = wrapped.make();

const usersHandler = require('../logic-layer/users');

router.post('/users/register', registerRequest);
router.post('/users/login', loginRequest);

async function registerRequest(req, res) {
	let name = req.body.name;
	let pass = req.body.pass;

	let result = await usersHandler.register(name, pass);
	if (result.success) {
		res.status(200);
	} else {
		res.status(400).send(result.message);
	}
}

async function loginRequest(req, res) {
	let name = req.body.name;
	let pass = req.body.pass;

	let result = await usersHandler.login(name, pass);
	if (result.success) {
		res.send({
			token: result.return
		});
	} else {
		res.status(401).send();
	}
}

module.exports = router.router;
