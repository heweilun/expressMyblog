// 配置
const env = process.env.NODE_ENV//环境变量
let MYSQL_CONF
let REDIS_CONF

if(env === 'development'){
    MYSQL_CONF = {
        host: "localhost",//ip
        user: 'root',//用户名
        password: 'admin123456',//密码
        port: '3306',//端口
        database: 'myblog',//数据库名
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379,
        user: 'root',
        password: {auth_pass: 'admin123456'},
    }
}

if(env === 'production'){
    MYSQL_CONF = {
        host: "localhost",
        user: 'root',
        password: 'Hikvision110.',
        port: '3306',
        database: 'myblog',
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379,
        user: 'root',
        password: {auth_pass: 'admin123456'},
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}