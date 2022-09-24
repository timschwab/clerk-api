// Load Express and logger
const express = require("express");
const router = express.Router();
const logger = require("./logger");

// Load middlewares
const cors = require("./request-layer/cors");
const auth = require("./request-layer/auth");
const errors = require("./request-layer/errors");

// Load main routes
const users = require("./request-layer/users");
const tokens = require("./request-layer/tokens");
const groups = require("./request-layer/groups");

// Use initial middlewares
router.use(cors);
router.use(express.json());
router.use(auth);

// Use the main routes
router.use(users);
router.use(tokens);
router.user(groups);

// Handle errors
router.use(errors.error404);
router.use(errors.error500);

// Export
module.exports = router;
