//引入数据库操作
const xss = require('xss')//xss攻击防御
const { exec, escape } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select id, title, content, createtime, author from blogs where 1=1 `//1=1占位保证where的正确
    if(author) {//有作者的查询
        sql += `and author='${author}' `
    }
    if(keyword) {//有keyword的查询
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    //返回prommise
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`
    //返回promise
    return exec(sql)
}

const newBlog = (blogData = {}) => {
    //blogData是一个博客对象，包含title content author熟悉
    const { title, content, createtime=Date.now(), author } = blogData
    let sql = `insert into blogs (title, content, createtime, author) 
    values (${xss(escape(title))}, ${xss(escape(content))}, ${escape(createtime)}, ${xss(escape(author))})`
    return exec(sql)
}

const updateBlog = (blogData = {}) => {
    //有id返回true 无返回false
    const { title, content, id, author } = blogData
    let sql = `update blogs set title=${xss(escape(title))}, content=${xss(escape(content))} where id=${xss(escape(id))} and author=${xss(escape(author))}`
    return exec(sql)
}

const deleteBlog = (blogData = {}) => {
    const { id, author } = blogData;
    let sql = `delete from blogs where id=${id} and author=${xss(escape(author))}`
    return exec(sql)
}

module.exports =  {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}