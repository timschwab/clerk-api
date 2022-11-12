let hooks = {};

function register(name, func) {
	if (!hooks[name]) {
		hooks[name] = [];
	}

	hooks[name].push(func);
}

function run(name, param) {
	if (hooks[name]) {
		for (let hook of hooks[name]) {
			hook(param);
		}
	} else {
		// If nothing has registered to this hook, do nothing
	}
}

module.exports = {
	register,
	run
};
