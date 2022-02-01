var express = require('express');
var router = express.Router();
const loginCheck = require('../middleware/loginCheck')
const { 
    getList, 
    getDetail, 
    newBlog,
    updateBlog,
    deleteBlog
} = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")

router.get('/list', (req, res, next)=> {
    const { author, keyword, isadmin } = req.query || {}
    if(isadmin) {
        //管理员界面
        if(req.session.username == null) {
            //未登录
            res.json(new ErrorModel(null, "尚未登录", 401))
            return
        }
        //强制查询自己的博客
        author = req.session.username
    }
    const sqlData = getList(author || "", keyword === 'null'?null: keyword || "")
    return sqlData.then(responseData => {
        res.json(new SuccessModel(responseData, 'success'))
    })
});

router.get('/detail', loginCheck, (req, res, next)=> {
    const { id } = req.query
    const sqlData = getDetail(id || null)
    return sqlData.then(responseData => {
        if(responseData[0]) {
            res.json(
                new SuccessModel(responseData[0], 'success')//select返回的数据都是数组类型
            )
            return 
        }else {
            res.json(
                new ErrorModel(null)
            )
        }
    })
});

router.post('/new', loginCheck, (req, res, next)=> {
    req.body.author = req.session.username
    const sqlData = newBlog(req.body)
    return sqlData.then(responseData => {
        if(responseData) {
            res.json(new SuccessModel({id: responseData.insertId}, 'success'))//返回新建的数据id
        }else {
            res.json(new ErrorModel(null, "博客创建失败"))
        }
    })
});

router.post('/update', loginCheck, (req, res, next)=> {
    req.body.author = res.session.username
    const sqlData = updateBlog(req.body)
    return sqlData.then(updateData => {
        if(updateData.affectedRows > 0) {//mysql返回的操作受影响数
            res.json(new SuccessModel()) 
        }else {
            res.json(new ErrorModel(null))
        }
    })
});

router.post('/delete', loginCheck, (req, res, next)=> {
    req.body.author = req.session.username
    const sqlData = deleteBlog(req.body)
    return sqlData.then(updateData => {
        if(updateData.affectedRows > 0) {//mysql返回的上次操作受影响数
            res.json(new SuccessModel()) 
        }else {
            res.json(new ErrorModel(null))
        }
    })
});
module.exports = router;
