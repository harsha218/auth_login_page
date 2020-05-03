const model = require('../model/user');

let user = {}

user.sendMail = (obj) => {
    return model.sendMail(obj).then(data => {
        if(data){
            return data
        }else{
            let err = new Error("Otp not recognized")
            err.status = 400;
            throw err
        }
    })
}

user.validateMail = (userMail, token) => {
    return model.validateMail(userMail, token).then(data => {
        if(data){
            return data
        }else{
            let err = new Error("Wrong otp")
            err.status = 400;
            throw err
        }
    })
}

user.sendSms = (obj) => {
    return model.sendSms(obj).then(data => {
        if(data){
            return data
        }else{
            let err = new Error("Otp not recognized")
            err.status = 400;
            throw err
        }
    })
}

user.validateSms = (userMobile, token) => {
    return model.validateSms(userMobile, token).then(data => {
        if(data){
            return data
        }else{
            let err = new Error("Wrong otp")
            err.status = 400;
            throw err
        }
    })
}

module.exports = user;