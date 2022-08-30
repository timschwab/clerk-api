const wrapped = require("./wrappedRouter");
const router = wrapped.make();

const tokenHandler = require('../logic-layer/tokens');

router.get('/tokens/validate', validateRequest);

async function validateRequest(req, res) {
	let success = await tokenHandler.validate(req.auth);
	if (success) {
		res.status(200).send();
	} else {
		res.status(401).send();
	}
}

module.exports = router.router;
