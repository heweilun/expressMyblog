var express = require('express');
var router = express.Router();
const {
    login,
    register
} = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")

router.post('/login', function(req, res, next) {
    const sqlData = login(req.body)
    return sqlData.then(responseData => {
        //数据查询返回的都是数组类型
        if(responseData.length > 0 && responseData[0].username){
            req.session.username = responseData[0].username
            req.session.realname = responseData[0].realname
            res.json(new SuccessModel(responseData[0]))
            return
        }else {
            res.json(new ErrorModel(null,"账户或密码错误"))
        }
    })
});

router.post('/register', function(req, res, next) {
    const sqlData = register(req.body)
    return sqlData.then(responseData => {
        if(responseData) {
            res.json(new SuccessModel(responseData, 'success'))//返回新建的数据id
            return 
        }else {
            res.json(new ErrorModel(null, "账户注册失败"))
        }
    })
});

module.exports = router;
