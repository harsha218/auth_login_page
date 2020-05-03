const express = require("express");
const routing = express.Router();
const service = require('../service/user');
const User = require('../model/userClass')
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy')
const accountSid = 'Enter here';
const authToken = 'Enter here';
const client = require('twilio')(accountSid, authToken);

//send an json object with user mail
routing.post("/sendMail", (req, res, next) => {
    let obj = new User(req.body);
    var secret = speakeasy.generateSecret({ length: 20 });
    var token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'enter here',
            pass: 'enter here'
        }
    });
    var mailOptions = {
        from: 'enter here',
        to: req.body.userMail,
        subject: 'Sending Email using Node.js',
        text: token
    };
    obj.token = secret.base32
    transporter.sendMail(mailOptions).then(success => {
        return service.sendMail(obj).then(data => {
            if (data) {
                res.json({ 'message': 'otp sent' })
            }
        }).catch(err => {
            next(err)
        })
    }).catch(err => {
        next(err)
    })
})

//send an json object with usermail and token
routing.post("/validateMail", (req, res, next) => {
    var userMail = req.body.userMail
    var token = req.body.token
    return service.validateMail(userMail, token).then(data => {
        res.json({ 'message': 'Verified' })
    }).catch(err => {
        next(err)
    })
})

//send an json object with user mobile number
routing.post("/sendSms", (req, res, next) => {
    let obj = new User(req.body);
    var secret = speakeasy.generateSecret({ length: 20 });
    var token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });
    obj.token = secret.base32

    client.messages
        .create({ body: 'Hi there!' + token, from: 'enter here', to: obj.userMobile })
        .then(message => {
            return service.sendSms(obj, token).then(data => {
                if (data) {
                    res.json({ 'message': 'otp sent' })
                }
            }).catch(err => {
                next(err)
            })
        }).catch(err => {
            next(err)
        })
})

//send an json object with userMobile and token
routing.post("/validateSms", (req, res, next) => {
    var userMobile = req.body.userMobile
    var token = req.body.token
    return service.validateSms(userMobile, token).then(data => {
        res.json({ 'message': 'Verified' })
    }).catch(err => {
        next(err)
    })
})

module.exports = routing;
