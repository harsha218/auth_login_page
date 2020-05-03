const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);


let userData = {
    userMail : {type: String, unique: true},
    userMobile : {type: Number, unique: true},
    signupDate : {type: Date, required: true, default: new Date().toLocaleString()}
}

let pendingUserData = {
    userMail : {type: String, unique: true},
    userMobile : {type: String, unique: true},
    token : {type: String},
    signupDate : {type: Date, required: true, default: new Date().toLocaleString()}
}


let userSchema = new Schema(userData, {collection:'userData', timestamps: true});
let pendingUserSchema = new Schema(pendingUserData, {collection:'pendingUserData', timestamps: true});

let connection = {}

connection.getUserCollection = () => {
    return mongoose.connect('mongodb://localhost:27017/loginApi',{useNewUrlParser: true, useUnifiedTopology: true }).then(database => {
        return database.model('userData', userSchema);
    }).catch(error => {
        let err = new Error("Couldnot connect to database");
        err.status = 500;
        throw err;
    })
}

connection.getPendingUserCollection = () => {
    return mongoose.connect('mongodb://localhost:27017/loginApi',{useNewUrlParser: true, useUnifiedTopology: true }).then(database => {
        return database.model('pendingUserData', pendingUserSchema);
    }).catch(error => {
        let err = new Error("Couldnot connect to database");
        err.status = 500;
        throw err;
    })
}

module.exports = connection;