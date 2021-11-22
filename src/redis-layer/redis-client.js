const redis = require('redis');
const configs = require('/clerk/configs/redis-config.json');

let client = redis.createClient(configs);
client.connect().then(() => console.log('Redis connected'));

module.exports = client;
