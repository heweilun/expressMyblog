// 数据返回统一处理模型
class BaseModel {
    constructor(data, message) {
        if(data) {
            this.data = data
        }
        if(message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message, errno){
        super(data, message)
        this.errno = errno || 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message, errno) {
        super(data, message)
        this.errno = errno || -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}