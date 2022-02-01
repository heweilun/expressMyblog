const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
    if(req.session.username) {
        next()
        return
    }else {
        res.json(
            new ErrorModel(null, "尚未登录", 401)
        )
    }
}