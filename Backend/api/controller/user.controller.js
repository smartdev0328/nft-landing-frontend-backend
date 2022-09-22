const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
// const sign = require('jwt-encode');
const decoder = require('jwt-decode')
    require('dotenv').config();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const companyMailAddress = process.env.COMPANY_MAIL;
const companyMailPassword = process.env.COMPANY_MAIL_PASSWORD;
var sanitize = require('mongo-sanitize');
const crypto = require('crypto');
const {
    MerkleTree
} = require("merkletreejs");
const keccak256 = require("keccak256");
const axios = require('axios');
const fetch = require("isomorphic-fetch");

let leaves;
let merkleTree = null;
let rootHash;

const addressesToWhitelist =['0xD50D1a1db1d85170e8Db10A29fb76bc22c672530',
'0x1C1c28D07ef2192E6d2b788ab80f3e25FEa51de7',
'0x13f5E09642C746CFE70cBE03c41dE96ce11A7b83',
'0xE57b11dB7e8f9e730Ad60448a8f2A2fe1575Cb96',
'0x6F767DD1925772d78bDf082b8BC2528815D72862',
'0xB6A9541a813f92304b74E34d77BeC46D48426335',
'0xc54Cc9bd129D6D80Ca9Ba08287017e9EDb0ab1e2',
'0x5001478650303b6120ce86e76c1C75828419c64A',
'0x45e5bAc8C275aB5673725811d9a4a9749d718818',
'0x8a08722E8A865Ef14AbA33912FfD7E42de6A970b',
'0xD7Cf3aD65769F667c0263Db2D560f14B89F2e4fD',
'0x6B974587c2c7490a84555D598b71c3774170C0d5',
'0x1032c4db1a04638Ad0A9EEBA0ef6d98CFEb6D8B7',
'0x968809454eC97Fb0d5686cf66bfC040495bB55cA',
'0xc3DbF6cc9F8980e72f04EEFdeBD504c55558E353',
'0xCA89D1e931c64f1C10DED6A322Ea4be9416f04b8',
'0x354d88273e0CbE4b66f3207b2b2050b519e606fe',
'0x0eD8078F93caed77DEeF6576fcd63690D3B1Ff4a',
'0x911A20396E64Ac47dab0B1C378C003247523a87A',
'0x1D9B2841A8DCc310A81cb46ef87730fdaf7a46EF',
'0xd751C17a0b07bA08DA23a72F6764e6dd9a7cA567',
'0x753322786E99F38D0019eA0eB6FbBa1d6D8a692E',
'0xa8F7dCF7b451A6e8475F8cfCE0d4BeBC4386C19b',
'0xE54fD6C85224d07Bb6a108dD0B0dda3E321A92f8',
'0x2FDa9a687b74409043bF934CB5Fa6E90cF6402e2',
'0x5cd25B9cc6255A95F6B5cAd434b9B38221af2e9a',
'0xfb89a458680019EAFd7CCbC6D87695f085f3e955',
'0x4C3171E5223119a6B2A3BDCc622d58bf7bE3EDF6',
'0xB909a4fbC9333e62021802c61ed913DbAE068548',
'0xd584c45e802a9c75D9408475C32752853e659a27',
'0x8DB0F9ae48E3Fd0671Aa0B8AaB0e631E839A0DEF',
'0x11af9d448c712893cBB62d42EF4AFFBBB49f85A3',
'0xC755e6238a95E01C9499c98d31810DD126fC29b8',
'0x399095205c45f75d23D162302aC271F0F937b373',
'0xe9E0D6A6cf8115B86018B4885C79408D271304f9',
'0x360C29579a44579B55BF99b05a30a4D52b8312E2',
'0x4359DC2d8786870d84d7Db19D056E345c4a7b15D',
'0x9e029879Cd275d5e669fFFa7d45f81f321ef12Fb',
'0x6d32F15f94AcA6f25306C3926A54b87ce22bf960',
'0xf1D0E6348D64d287288B5518911A816E3361Cb1f',
'0x817f9118920B13471CAA07cdD023bCe256dD7EF6',
'0x47A15A0e4D8AA6857705f16A5b33D2C579D19ebF',
'0x31B12d5c5f09Ba9Ae21e40705005CabDD074b21b',
'0xe207DB986430e8f503e79BC104b3d813C2D54E92',
'0x6b30444E07a0F077944C7a21558577EF991f3838',
'0x1E88326339F45aB7e7C8c12f28b74A322e1d78fe',
'0xBD9125abe499CAf4D661Dde7eCBC3F3106aDCBC5',
'0x871e25ED8A5A4812a8b4E0B05BC58ad3f5856732',
'0xdAE779715e0218088243c407fd82F8968eEBE147',
'0xc24423969E2Bf21788F22064fCccCA14Fa2929E5',
'0x7DF99F74dF53C7e5C8916C77349A38924D58872f',
'0xA27053655BF10e49cbaCba8321eeC0265242a8c4',
'0xAb834372dc30Cd309a1494759D7813e821bBd3Ba',
'0xcB32485E29e88bd372E107C33e6648e2AcBfcB03',
'0x582cEa992BEF31D389Ffe03489b7157c854cDcac',
'0xDaf359D14387628853a2608912Df96af183250d2',
'0xB9ED802AF9Ed9161854850D1b5b44f83198b8eAA',
'0x659fdcF04Ff13f8d8247B3D715F37cB1a012dD20',
'0xc1A9f1F842558743AB97592Bc44771A047215865',
'0x9Cb958a2DD561219Ef978fEBfEcD6266Acda28Cb',
'0x3B9120dE3924c0054A6ee41Ab39301d527200bb4',
'0xa14B2385a490F5de1C31DAb012B0D56F3c1b375d',
'0xACc25219EC93DE06a0f5c7BabE2D37AdEe9918Ec',
'0x613b82bddCec9c12CC298bbBd217EF05FF22db2d',
'0x931c5CE00ab4D0523e2B478d247e0865CFA895D9',
'0xeFa6092a9a170771a9CC9b0B0ad522546a0b0FB1',
'0xf0C36ab0917888820F4bA5c90515cf78b5dCF8d5',
'0x78Ddb7F3D56a406a71b919DbbbfFE22B26B81732',
'0x79C58B13A34BcA98376ad4598f896f1016DdE4Ff',
'0x81Bf0966d70180e62b2067B926f301De77464D27',
'0x6AcCcb2B2cB31F7a40a72e43acf90a85eE159b6A',
'0x1A22178750c36304447f85778236EA28c7f5444B',
'0xFA605490E027Bb38C6930659E4aBAc8bE1C648a8',
'0x9296B6DD424f689E1A0f25606fDA552e02D5501b',
'0x70489ec26cE8D46452EcB78397dd11e03E5Ac59C',
'0xA0ebc31554427a22cC5cb8326F48Bc033d73FbE5',
'0x777Fc7b373d333eF31d96857D7c6270674Fd2727',
'0x4Be1Eb03FeBDB3c4B095617dda89E4f1639E178b',
'0xAF0BeDE962DC859C0FDdcAfF835524dB884cb539',
'0x6e3131501b30499810987c2246c76f91c833af95']

function generateMerkleRoot() {
    leaves = addressesToWhitelist.map(addr => keccak256(addr));
    merkleTree = new MerkleTree(leaves, keccak256, {
        sortPairs: true
    });
    rootHash = merkleTree.getRoot().toString('hex');
    //console.log('Leaves are ', leaves.toString());
    console.log('Tree is ', merkleTree.toString());
    console.log('Root is ', rootHash);
}

const getMerkleRoot = (req, res) => {
    console.log('Get Merkle');
    try {
        if (merkleTree === null)
            generateMerkleRoot()

            res.status(200).json({
                rootHash
            });
    } catch (e) {
        console.log(e);
        res.end();
    }
}

const checkWhitelisted = (req, res) => {
    console.log('Get Proof');
    try {
        if (isWhitelisted(req.body.wallet)) {
            var hashedAddress = keccak256(req.body.wallet);
            var proof = merkleTree.getHexProof(hashedAddress);
            res.status(200).json(proof)
        } else {
            res.status(201).json({
                'Message': 'Error not whitelisted'
            })
        }
    } catch (e) {
        console.log(e);
        res.end();
    }
}

function verifyCaptcha(requestToken) {
    const encodedRequest = encodeURIComponent(requestToken);
    const url =
`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${encodedRequest}`;

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
        return false;
    });
}

function isWhitelisted(wallet) {
    console.log("Checking Whitelisted")
    console.log('wallet is: ', wallet);
    try {
        var hashedAddress = keccak256(wallet);
        if (merkleTree === null || merkleTree === undefined) {
            generateMerkleRoot()
        }
        var proof = merkleTree.getHexProof(hashedAddress);
        var isWhitelisted = merkleTree.verify(proof, hashedAddress, rootHash)
            return isWhitelisted;
    } catch (error) {
        console.log(error)
        return false;
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

function generateOTP() {
    var digits = '0123456789';
    var OTP = '';
    for (let i = 0; i < 6; i++) {
        try {
            OTP += digits[Math.floor(crypto.randomInt(10))];

        } catch (error) {
            console.log(error);
        }
    }

    return OTP;
}

function generateAccessToken(username) {
    console.log('Details for token ', username);
    const expirationSeconds = 60 * 60 * 24 * 1; // 1 days
    var token = '';
    try {
        token = jwt.sign({
            username
        }, process.env.SECRET, {
            expiresIn: expirationSeconds,
        });

        console.log('Signed ', token);
    } catch (error) {
        console.log(error);
        console.log('token not signed');
    }

    console.log('tkn value ', token);
    return token;
}

const createAccount = (req, res, notEmail = true, otpValue = "", responseMessage = "") => {
    var sanitizedBody = sanitize(req.body);
    console.log('creating user');

    const newUser = new User({
        fullName: sanitizedBody.name,
        verified: notEmail,
        otp: otpValue,
        otpTime: Date.now(),
        email: sanitizedBody.email || sanitizedBody.emailAddress,
        wallet: 'none',
        userName: sanitizedBody.userName,
        signUpMethod: sanitizedBody.signUpMethod,
        nationality: sanitizedBody.nationality,
        password: req.body.password || ''
    });

    try {
        newUser.save(function (err, result) {
            if (err) {
                console.log("Error occurred while creating user!", err);
                //res.status(404).json('Error occurred while creating user!');
                return;
            } else {
                console.log("user created!");
                var userData = createUserObject(newUser.fullName, newUser.verified, newUser.email, newUser.wallet, newUser.userName, newUser.signUpMethod);
                console.log('new id ', newUser._id);
                const signedJwt = generateAccessToken(newUser._id);
                const redirectUrl = process.env.REDIRECT_URL;

                const message = {
                    from: companyMailAddress,
                    to: sanitizedBody.email || sanitizedBody.emailAddress,
                    subject: 'Verification to access Affyn Marketplace ✔',
                    text: 'Please check your mail box and click the link.',
                    html: '<div style="width: 100%; height: 83px; background-color: #1E2333; display: flex; align-items: center;"><img src="https://affyn-mailer.s3.us-west-1.amazonaws.com/Affyn-logo.png" alt="Affyn" style="margin-left: 30px;"></div>' +
                    '<div style="width: calc(100% - 60px); padding: 40px 30px;">' +
                    '<div style="font-size: 32px; color: #1E2333; margin-bottom: 40px;">Your One Time Password (OTP)</div>' +
                    '<div style="font-size: 16px; color: #1E2333; margin-bottom: 40px;">Kindly note that the OTP expires in 5 minutes.</div>' +
                    '<a href=' + `${redirectUrl}verify/${signedJwt}` + '><h3>Click to Verify</h3></a>' +
                    '<div style="font-size: 24px; margin-top: 30px;">Enter the following OTP into the verification page to confirm your email:</div>' +
                    '<div style="width: 100%; height: 96px; display: flex; align-items: center; justify-content: center; border: 1px solid #CCCCCC; margin-top: 15px;"><h3>OTP : ' + `${otpValue}` + '</h3></div>' +
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
                    console.log('this is new user!')
                    smtpTransport.sendMail(message).then((response, err) => {
                        if (err) {
                            console.log("error ocurred while verifying", err);
                            res.status(404).json();
                            return;
                        }
                        if (!response) {
                            res.status(503).json('Verification Error!')
                            return;
                        }
                        if (response) {
                            console.log('smtp response is ', response);
                            res.status(200).json({
                                userData,
                                responseMessage,
                                jwt: signedJwt
                            });
                            return;
                        }
                    })
                } catch (err) {
                    console.log("error occurred!", err);
                    res.status(535).json('Internal server Error.');
                    return;
                }

                return;
            }
        })
    } catch (error) {
        console.log(error);
        res.end();
    }
}

const signUpWithEmail = (req, res) => {
    var sanitizedBody = sanitize(req.body);
    console.log('Trying to send signup email here is info ', sanitizedBody);
    const OTP = generateOTP();
    console.log('OTP Value : ', OTP);
    console.log('signupwithemail called!', sanitizedBody)

    if (verifyCaptcha(req.body.recaptchaResult) === false) {
        res.status(404).json('Recaptcha Failed');
        return;
    }

    try {
        User.findOne({
            email: sanitizedBody.emailAddress
        })
        .then((user, err) => {
            if (err) {
                res.status(404).json('Error occurred in finding user');
                //res.end();
            }
            if (user) {
                if (user.verified)
                    res.status(201).json({
                        message: 'User is registered or unverified'
                    });
                else
                    res.status(201).json({
                        message: 'User is registered or unverified'
                    });
            } else {
                createAccount(req, res, false, OTP);
                return;
            }
        })
    } catch (error) {
        console.log(error);
        res.end();
    }
}

// TODO: fix resend otp function
const resendEmail = (req, res) => {
    var sanitizedBody = sanitize(req.body);
    let userInfo;
    console.log('Resending email');
    console.log(sanitizedBody);

    if (req.auth !== undefined && sanitize(req.auth).username !== null && sanitize(req.auth).username !== undefined) {
        try {
            console.log('Resending email 2');
            console.log('Auth ', req.auth);
            console.log('Body ', req.body);

            User.findOne({
                _id: sanitize(req.auth).username
            })
            .then((userInfo2, err) => {
                if (err) {
                    console.log('Unable to find ', err);
                    res.status(404).json('Error occurred in finding user');
                    return;
                }
                if (userInfo2) { {
                        console.log(userInfo2);
                        const verifyCode = generateAccessToken(userInfo2._id);
                        const redirectUrl = process.env.REDIRECT_URL;

                        var OTP = generateOTP();

                        console.log('OTP Value : ', OTP);

                        console.log('resend email called!', sanitizedBody)
                        const message = {
                            from: companyMailAddress,
                            to: userInfo2.email,
                            subject: 'Verification to access Affyn Marketplace ✔',
                            text: 'Please check your mail box and click the link.',
                            html: '<div style="width: 100%; height: 83px; background-color: #1E2333; display: flex; align-items: center;"><img src="https://affyn-mailer.s3.us-west-1.amazonaws.com/Affyn-logo.png" alt="Affyn" style="margin-left: 30px;"></div>' +
                            '<div style="width: calc(100% - 60px); padding: 40px 30px;">' +
                            '<div style="font-size: 32px; color: #1E2333; margin-bottom: 40px;">Your One Time Password (OTP)</div>' +
                            '<div style="font-size: 16px; color: #1E2333; margin-bottom: 40px;">Kindly note that the OTP expires in 5 minutes.</div>' +
                            '<a href=' + `${redirectUrl}verify/${verifyCode}` + '></h3>Click to Verify</h3></a>' +
                            '<div style="font-size: 24px; margin-top: 30px;">Enter the following OTP into the verification page to confirm your email:</div>' +
                            '<div style="width: 100%; height: 96px; display: flex; align-items: center; justify-content: center; border: 1px solid #CCCCCC; margin-top: 15px;"><h3>OTP : ' + `${OTP}` + '</h3></div>' +
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
                            User.findOne({
                                email: userInfo2.email
                            })
                            .then((user, err) => {
                                if (err) {
                                    res.status(404).json('Error occurred in finding user');
                                    return;
                                } else if (user) {
                                    if (user.verified) {
                                        console.log('this is verified user!')
                                        res.status(201).json({
                                            message: 'User has already been verified',
                                            user
                                        });
                                        return;
                                    } else {
                                        try {
                                            console.log('this is not verified user!')
                                            user.otp = OTP;
                                            user.otpTime = Date.now();
                                            user.save(function (err, result) {
                                                if (err) {
                                                    console.log(err);
                                                    //res.status(404).json();
                                                    return;
                                                } else {
                                                    smtpTransport.sendMail(message).then((response, err) => {
                                                        if (err) {
                                                            console.log("Error ocurred while verifying : ", err);
                                                            res.status(404).json();
                                                            return;
                                                        }
                                                        if (!response) {
                                                            res.status(503).json('Process failed!')
                                                            return;
                                                        }
                                                        if (response) {
                                                            console.log('smtp response is ', response);
                                                            res.status(200).json('Verification code sent!');
                                                            return;
                                                        }
                                                    })
                                                }
                                            });
                                        } catch (err) {
                                            console.log("error occurred!", err);
                                            res.status(535).json('Process failed!');
                                            return;
                                        }
                                    }
                                } else {
                                    res.status(404).json('Process failed!');
                                    return;
                                }
                            })
                        } catch (error) {
                            console.log(error);
                            res.end();
                        }
                    }
                } else {
                    res.status(404).json('Error occurred in finding user');
                    return;
                }
            })
        } catch (error) {
            console.log(error);
            res.end();
            return;
        }
    } else {
        try {
            console.log('Finding via email ', sanitizedBody.emailAddress)
            User.findOne({
                email: sanitizedBody.emailAddress
            })
            .then((userInfo, err) => {
                if (err) {
                    // res.status(404).json('Error occurred in finding user');
                    // return;
                    console.log('Cannot find user via email. Could be via ID. Searching.')
                }
                if (userInfo) { {
                        console.log(userInfo);
                        const verifyCode = generateAccessToken(userInfo._id);
                        const redirectUrl = process.env.REDIRECT_URL;

                        var OTP = generateOTP();

                        console.log('OTP Value : ', OTP);

                        console.log('resend email called!', sanitizedBody)
                        const message = {
                            from: companyMailAddress,
                            to: sanitizedBody.emailAddress,
                            subject: 'Verification to access Affyn Marketplace ✔',
                            text: 'Please check your mail box and click the link.',
                            html: '<div style="width: 100%; height: 83px; background-color: #1E2333; display: flex; align-items: center;"><img src="https://affyn-mailer.s3.us-west-1.amazonaws.com/Affyn-logo.png" alt="Affyn" style="margin-left: 30px;"></div>' +
                            '<div style="width: calc(100% - 60px); padding: 40px 30px;">' +
                            '<div style="font-size: 32px; color: #1E2333; margin-bottom: 40px;">Your One Time Password (OTP)</div>' +
                            '<div style="font-size: 16px; color: #1E2333; margin-bottom: 40px;">Kindly note that the OTP expires in 5 minutes.</div>' +
                            '<a href=' + `${redirectUrl}verify/${verifyCode}` + '></h3>Click to Verify</h3></a>' +
                            '<div style="font-size: 24px; margin-top: 30px;">Enter the following OTP into the verification page to confirm your email:</div>' +
                            '<div style="width: 100%; height: 96px; display: flex; align-items: center; justify-content: center; border: 1px solid #CCCCCC; margin-top: 15px;"><h3>OTP : ' + `${OTP}` + '</h3></div>' +
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
                            User.findOne({
                                email: sanitizedBody.emailAddress
                            })
                            .then((user, err) => {
                                if (err) {
                                    res.status(404).json('Error occurred in finding user');
                                    return;
                                } else if (user) {
                                    if (user.verified) {
                                        console.log('this is verified user!')
                                        res.status(201).json({
                                            message: 'User has already been verified',
                                            user
                                        });
                                        return;
                                    } else {
                                        try {
                                            console.log('this is not verified user!')
                                            user.otp = OTP;
                                            user.otpTime = Date.now();
                                            user.save(function (err, result) {
                                                if (err) {
                                                    console.log(err);
                                                    //res.status(404).json();
                                                    return;
                                                } else {
                                                    smtpTransport.sendMail(message).then((response, err) => {
                                                        if (err) {
                                                            console.log("Error ocurred while verifying : ", err);
                                                            res.status(404).json();
                                                            return;
                                                        }
                                                        if (!response) {
                                                            res.status(503).json('Process failed!')
                                                            return;
                                                        }
                                                        if (response) {
                                                            console.log('smtp response is ', response);
                                                            res.status(200).json('Verification code sent!');
                                                            return;
                                                        }
                                                    })
                                                }
                                            });
                                        } catch (err) {
                                            console.log("error occurred!", err);
                                            res.status(535).json('Process failed!');
                                            return;
                                        }
                                    }
                                } else {
                                    res.status(404).json('Process failed!');
                                    return;
                                }
                            })
                        } catch (error) {
                            console.log(error);
                            res.end();
                        }
                    }
                } else {
                    res.status(404).json('Error occurred in finding user');
                    return;
                }
            })
        } catch (error) {
            console.log(error);
            res.end();
            return;
        }
    }
}

const userVerification = (req, res) => {
    console.log('auth log ', req.auth);
    var sanitizedBody = sanitize(req.auth);
    console.log('userVerification otp called');
    console.log('email auth:', sanitizedBody);
    console.log('body value ', req.body);
    try {
        User
        .findOne({
            _id: sanitizedBody.username
        })
        .then((user, err) => {
            if (err) {
                res.status(404).json('Error occurred in finding user');
                return;
            }
            if (user) {
                if (user.verified) {
                    var userData = createUserObject(user.fullName, user.verified, user.email, user.wallet, user.userName, user.signUpMethod);

                    res.status(201).json({
                        message: 'Already registered',
                        userData
                    });
                } else {
                    if (user.otp == sanitize(req.body.otpValue)) {
                        var diff = Math.abs(Date.now() - user.otpTime);
                        console.log('time difference is : ', diff);
                        var minutes = Math.floor((diff / 1000) / 60);
                        console.log('time difference is minutes : ', minutes);
                        if (minutes < 5) {
                            console.log("OTP Verified");
                            user.verified = true;
                            user.otp = 'notavail';
                            user.save(function (err, result) {
                                if (err) {
                                    console.log(err);
                                    //res.status(404).json();
                                    return;
                                } else {
                                    var userData = createUserObject(user.fullName, user.verified, user.email, user.wallet, user.userName, user.signUpMethod);
                                    res.status(200).json({
                                        userData,
                                        'message': 'Success'
                                    });
                                    return;
                                }

                            });

                        } else {
                            console.log("OTP expired");
                            resendEmail(req, res);
                        }
                    } else {
                        res.status(404).json({
                            'message': 'Authentication error!'
                        });
                        return;
                    }
                }
                return;
            } else {
                try {
                    console.log('this is new user! please create an account first')
                } catch (err) {
                    console.log("error occurred!", err);
                    res.status(535).json('Internal Server Error.');
                }

            }
        })
    } catch (error) {
        console.log(error);
        res.end();
    }
}

const sendResetPasswordRequestMessage = (req, res) => {
    var sanitizedBody = sanitize(req.body);
    const email = sanitizedBody.email;

    try {
        User
        .findOne({
            email: email
        })
        .then((user, err) => {
            if (err) {
                res.status(404).json('Error occurred in finding user');
                return;
            }
            if (user) {
                try {
                    console.log('User Reset Password')
                    const verifyCode = generateAccessToken(user._id);

                    console.log("verification code is ", verifyCode);

                    const redirectUrl = process.env.REDIRECT_URL;
                    console.log('Reset Password called!', sanitizedBody)
                    const message = {
                        from: companyMailAddress,
                        to: email,
                        subject: 'Reset password to access Affyn Marketplace ✔',
                        text: 'Please check your mail box and click the link.',
                        html: '<div style="width: 100%; height: 83px; background-color: #1E2333; display: flex; align-items: center;"><img src="https://affyn-mailer.s3.us-west-1.amazonaws.com/Affyn-logo.png" alt="Affyn" style="margin-left: 30px;"></div>' +
                        '<div style="width: calc(100% - 60px); padding: 40px 30px;">' +
                        '<div style="font-size: 32px; color: #1E2333; margin-bottom: 40px;">Forgot your password?</div>' +
                        '<a href=' + `${redirectUrl}reset-pass/${verifyCode}` + '><h3>Reset password</h3></a>' +
                        '<div style="font-size: 24px; margin-top: 30px;">If the link doesn’t work, copy and paste the URL in your browser:</div>' +
                        '<div style="width: 100%; height: 96px; display: flex; align-items: center; justify-content: center; border: 1px solid #CCCCCC; margin-top: 15px;">' + `https://staging.affyn.com/reset-pass/${verifyCode}` + '</div>' +
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

                    smtpTransport.sendMail(message).then((response, err) => {
                        if (err) {
                            console.log("error ocurred while verifying", err);
                            return;
                        }
                        if (!response) {
                            res.status(503).json('Process failed!')
                            return;
                        }
                        if (response) {
                            console.log('smtp response is ', response);
                            res.status(200).json('Verification code sent!');
                            return;
                        }
                    })
                } catch (err) {
                    console.log("error occurred!", err);
                    res.status(535).json('Process failed!');
                    return;
                }
            } else {
                res.status(401).json({
                    'message': 'Process failed!'
                });
                return;
            }
        })
    } catch (error) {
        console.log(error);
        res.end();
    }
}

const updatePassword = (req, res) => {
    console.log("Called update password")
    const sanitizedBody = sanitize(req.auth);
    //const email = req.auth;
    console.log('email is: ', sanitizedBody);
    try {
        User.findOne({
            _id: sanitizedBody.username
        }).exec((err, user) => {
            if (err) {
                res.status(404).json({
                    "message": 'Server Error!'
                })
            }
            if (!user) {
                res.status(201).json({
                    "message": 'User update unsuccessful.'
                });
            }
            if (user) {
                user.password = req.body.password;
                user.save(function (err, result) {
                    if (err) {
                        console.log(err);
                        //res.status(404).json();
                        return;
                    } else {
                        res.status(200).json({
                            "message": "password has been updated!"
                        });
                        return;
                    }
                });

            }
        })
    } catch (error) {
        console.log(error);
        res.end();
    }
}

const connectWallet = (req, res) => {
    var sanitizedBody = sanitize(req.body);
    const email = sanitize(req.auth);
    var walletExist = false;

    console.log('email is: ', email);
    console.log('req is ', sanitizedBody);
    try {
        User.findOne({
            wallet: sanitizedBody.wallet
        }).exec((err, user) => {
            if (err) {
                return console.log(err);
            }
            if (!user) {
                walletExist = false;
                return;
            } else if (user) {
                console.log(user);
                walletExist = true;
                return res.status(201).json({
                    "message": "This wallet already registered! Please use another one."
                })
            }
        });

        if (walletExist) {
            res.status(201).json({
                "message": "This wallet already registered! Please use another one."
            })
            return;
        }

        const userName = email.userData.username || email.userData.email || email.userData.emailAddress

            console.log('Wallet does not exist');
        console.log(userName);

        User.findOne({
            email: userName
        }).exec((err, user) => {
            if (err) {
                res.status(404).json({
                    "message": 'Server Error!'
                })
            }
            if (!user) {
                res.status(201).json({
                    "message": 'User not found!'
                });
            }
            if (user) {
                if (String(user.wallet).length > 8) {
                    res.status(201).json({
                        "message": "This wallet already registered! Please use another one."
                    })
                } else {
                    user.wallet = sanitizedBody.wallet;
                    user.nationality = sanitizedBody.nationality;
                    if (walletExist) {
                        res.status(201).json({
                            "message": "This wallet already registered! Please use another one."
                        })
                        return;
                    }
                    user.save(function (err, result) {
                        if (err) {
                            console.log(err);
                            //res.status(404).json();
                            return;
                        } else {
                            res.status(200).json({
                                "message": "wallet has been updated!"
                            });
                            return;
                        }
                    });
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.end();
    }
}

module.exports = {
    signUpWithEmail,
    resendEmail,
    userVerification,
    sendResetPasswordRequestMessage,
    updatePassword,
    connectWallet,
    getMerkleRoot,
    checkWhitelisted
}
