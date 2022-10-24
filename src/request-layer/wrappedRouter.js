const express = require("express");

const methods = ["get", "post", "delete"];

function asyncHandler(handler) {
	let safeHandler = async function (req, res, next) {
		try {
			await handler(req, res, next);
		} catch (err) {
			next(err);
		}
	};

	return safeHandler;
}

function make() {
	// Create the router
	let router = express.Router();
	let wrapped = {
		router
	};

	// Add each of the methods we support with the functionality we want
	for (let method of methods) {
		wrapped[method] = function (path, handler) {
			router[method](path, asyncHandler(handler));
		};
	}

	// Return
	return wrapped;
}

module.exports = {
	make,
	asyncHandler
};
