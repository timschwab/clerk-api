const express = require("express");
const app = express();

const router = require("./src/router.js");

const port = 8357;
const test = "henlo";

app.use("/", router);

app.listen(port, () => console.log("Site running on " + port));
