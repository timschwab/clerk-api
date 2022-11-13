// A json value is one of: object, array, string, number, boolean, null
function jsonType(val) {
	let type = typeof val;
	if (type == "string") {
		return "string";
	}

	if (type == "number") {
		return "number";
	}

	if (type == "boolean") {
		return "boolean";
	}

	// type will be "object" for object, array, and null
	if (val === null) {
		return "null";
	}

	if (Array.isArray(val)) {
		return "array";
	}

	return "object";
}

module.exports = {
	jsonType
};
