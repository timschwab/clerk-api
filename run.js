const express = require('express');
const app = express();

const router = require('./src/router.js');

const port = 8357;

app.use('/', router);

app.listen(port, () => console.log('Site running on ' + port));
