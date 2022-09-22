const mongoose = require('mongoose');
const { sign } = require('jsonwebtoken');
const { expressjwt: jwt } = require('express-jwt');
const User = mongoose.model('User');
require('dotenv').config();
var sanitize = require('mongo-sanitize');
const nodemailer = require('nodemailer');
const companyMailAddress = process.env.COMPANY_MAIL;
const companyMailPassword = process.env.COMPANY_MAIL_PASSWORD;

const fetch = require("isomorphic-fetch");
var signInTries = {};

function sendTooManyRetryEmail(email) {
    console.log('too many retry called!', companyMailAddress, companyMailPassword)
    const message = {
        from: companyMailAddress,
        to: email,
        subject: 'Too many failed login Attempt.',
        text: 'We have detected that your account has too many unsuccessfuly login attempts',
        html: '<div style="width: 100%; height: 83px; background-color: #1E2333; display: flex; align-items: center;"><img src="https://affyn-mailer.s3.us-west-1.amazonaws.com/Affyn-logo.png" alt="Affyn" style="margin-left: 30px;"></div>' +
        '<div style="width: calc(100% - 60px); padding: 40px 30px;">' +
        '<div style="font-size: 32px; color: #1E2333; margin-bottom: 40px;">NOTICE</div>' +
        '<div style="font-size: 24px; margin-top: 30px;">There were too many failed attempts to access your account. Please reset your password if you have forgotten it.</div>' +
        '<div style="font-size: 24px; margin-top: 36px;">If you received this message by mistake, ignore this email.</div>' +
        '</div>',
    }
    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: companyMailAddress,
            pass: companyMailPassword
        }
    });

    try {
        smtpTransport.sendMail(message).then((response, err) => {
            if (err) {
                console.log("error ocurred while sending", err);
            }
            if (!response) {
                console.log('sending Error!')
            }
            if (response) {
                console.log('smtp response is ', response);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

function createUserObject(name, verified, email, wallet, userName, signUpMethod) {
    var userObject = {
        fullName: name,
        verified: verified,
        email: email,
        wallet: wallet,
        userName: userName,
        signUpMethod: signUpMethod
    }
    return userObject;
}

function verifyCaptcha(requestToken) {
    const encodedRequest = encodeURIComponent(requestToken);
    const url =
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${encodedRequest}`;
     
    console.log('verifying captcha ', encodedRequest);

    fetch(url, {
        method: "post",
      })
        .then((response) => response.json())
        .then((google_response) => {
          if (google_response.success == true) {
            return true;
          } else {
            console.log(google_response);
            return false;
          }
        })
        .catch((error) => {
            console.log('err ', error);
          return false;
        });
}

const signin = (req, res) => {
    console.log('sign in has been called!', req.body)
    var sanitizedBody = sanitize(req.body);

    console.log('captcha starting');

    if (verifyCaptcha(req.body.recaptchaResult) === false) {
        console.log("captcha failed");
        res.status(404).json({
            'message': 'recaptcha failed'
        });
        return;
    }

    console.log('captcha passed');

    User.findOne({
        "email": sanitizedBody.emailAddress
    }, (err, user) => {
        console.log("user exists!", user);
        if (err) {
            res.status(404).json({
                'message': err
            });
        }

        if (!user) {
            res.status(203).json({
                error: "Login Error"
            });
        }

        if (user && !user.authenticate(sanitizedBody.password)) {
            if (sanitizedBody.emailAddress in signInTries) {
                signInTries[sanitizedBody.emailAddress] += 1;
            } else {
                signInTries[sanitizedBody.emailAddress] = 1;
            }

            if (signInTries[sanitizedBody.emailAddress] > 5) {
                sendTooManyRetryEmail(sanitizedBody.emailAddress);
                signInTries[sanitizedBody.emailAddress] = 0;
            }
            res.status(201).json({
                error: "Login Error"
            })
        }

        if (user && user.authenticate(sanitizedBody.password)) {
			var userData = createUserObject(user.fullName, user.verified, user.email, user.wallet, user.userName, user.signUpMethod);
            console.log('Details for token ', userData);
            const expirationSeconds = 60 * 60 * 24 * 1; // 1 days

            var token = '';
            try {
                token = sign({
                    userData
                }, process.env.SECRET, {
                    expiresIn: expirationSeconds,
                });
        
                console.log('Signed ', token);
            } catch (error) {
                console.log(error);
                console.log('token not signed');
            }

            console.log("token  is ", token);

            res.status(200).json({
                token,
                userData
            });
            signInTries[sanitizedBody.emailAddress] = 0;
        }

    })
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "signed out"
    })
}

const authMiddleware = jwt({
    secret: process.env.SECRET,
    userProperty: 'auth',
    algorithms: ["HS256"],
});

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
        if (!(authorized)) {
            return res.status('403').json({
                error: "User is not authorized"
            })
        }
        next()
}

module.exports = {
    signin,
    signout,
    authMiddleware,
    hasAuthorization
}
