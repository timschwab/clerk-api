const express = require('express');
const app = express();

const apiRoutes = require('./src/routing.js');

const port = 8357;

app.use('/', apiRoutes);

app.listen(port, () => console.log('Site running on ' + port));
