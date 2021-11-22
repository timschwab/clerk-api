const redis = require('redis');

let client = redis.createClient();

module.exports = client;
