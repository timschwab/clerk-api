// Load Express and logger
const express = require("express");
const router = express.Router();

// Load middlewares
const cors = require("./request-layer/cors");
const auth = require("./request-layer/auth");
const errors = require("./request-layer/errors");

// Load main routes
const users = require("./request-layer/users");
const tokens = require("./request-layer/tokens");
const groups = require("./request-layer/groups");
const budget = require("./request-layer/budget");

// Use initial middlewares
router.use(cors);
router.use(express.json());
router.use(errors.errorJson);
router.use(auth);

// Use the main routes
router.use(users);
router.use(tokens);
router.use(groups);
router.use(budget);

// Handle errors
router.use(errors.error404);
router.use(errors.error500);

// Export
module.exports = router;
