//mysql数据库操作
const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

//创建连接对象
const connection = mysql.createConnection(MYSQL_CONF)
//开始连接
connection.connect()

function exec(sql) {
    //数据库操作
    const promise = new Promise((resolve, reject)=>{
        connection.query(sql, (error, results, fields)=> {
            if (error) reject(error);
            resolve(results)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}
//结束连接
// connection.end()