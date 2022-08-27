const express = require('express');
const app = express();

const apiRoutes = require('./src/routing.js');

const port = 8357;

// Add CORS
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/', apiRoutes);

app.listen(port, () => console.log('Site running on ' + port));
