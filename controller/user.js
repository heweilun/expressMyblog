const xss = require('xss')//xss攻击防御
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')


const login = (postData) => {
    const {username, password} = postData
    let sql = `select username, realname from users where username=${xss(escape(username))} and password=${escape(genPassword(xss(password)))}`
    return exec(sql)
}

const register = (postData) => {
    const {username, password} = postData
    let sql = `insert into users (username, password) 
    values ('${xss(escape(username))}', '${xss(escape(password))}')`
    return exec(sql)
}

module.exports = {
    login,
    register
}