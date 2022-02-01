const redis = require('redis') 
const { REDIS_CONF } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host, REDIS_CONF.password)

redisClient.on('error', err => {
    console.error(err)
})

module.exports = redisClient