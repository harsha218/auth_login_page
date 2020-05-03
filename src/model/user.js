const collection = require('../utilities/connection');
const speakeasy = require('speakeasy')

let user = {}

user.sendMail = (obj) => {
    return collection.getPendingUserCollection().then(database => {
        return database.deleteOne({userMail: obj.userMail}).then(data=>{
            return database.insertMany(obj).then(data => {
                if(data){
                    return true
                }else{
                    return false
                }
            })
        })
    })
}

user.validateMail = (userMail, token) => {
    return collection.getPendingUserCollection().then(pendingData => {
        return pendingData.findOne({userMail:userMail}).then(secret => {
            var tokenValidates = speakeasy.totp.verify({
                secret: secret.token,
                encoding: 'base32',
                token: token,
                window: 2
            });
            if(tokenValidates){
                return pendingData.deleteOne({userMail: userMail}).then(deleted => {
                    return collection.getUserCollection().then(userData => {
                        return userData.insertMany({userMail:secret.userMail}).then(insertedData => {
                            if(insertedData){
                                return insertedData
                            }else{
                                return false
                            }
                        })
                    })
                })
            }else{
                return false
            }
        })
    })
}

user.sendSms = (obj) => {
    return collection.getPendingUserCollection().then(database => {
        return database.deleteOne({userMobile: obj.userMobile}).then(data=>{
            return database.insertMany(obj).then(data => {
                if(data){
                    return true
                }else{
                    return false
                }
            })
        })
    })
}

user.validateSms = (userMobile, token) => {
    return collection.getPendingUserCollection().then(pendingData => {
        return pendingData.findOne({userMobile:userMobile}).then(secret => {
            var tokenValidates = speakeasy.totp.verify({
                secret: secret.token,
                encoding: 'base32',
                token: token,
                window: 2
            });
            if(tokenValidates){
                return pendingData.deleteOne({userMobile: userMobile}).then(deleted => {
                    return collection.getUserCollection().then(userData => {
                        return userData.insertMany({userMobile:secret.userMobile}).then(insertedData => {
                            if(insertedData){
                                return insertedData
                            }else{
                                return false
                            }
                        })
                    })
                })
            }else{
                return false
            }
        })
    })
}

module.exports = user;