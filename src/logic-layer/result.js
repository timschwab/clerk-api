/*
	Two helper functions to build responses that get passed around the logic layer.
*/

function success(returnObject) {
	return {
		success: true,
		return: returnObject
	};
}

function failure(message) {
	return {
		success: false,
		message: message
	};
}

module.exports = {
	success,
	failure
};
