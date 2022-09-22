var express = require('express');
var router = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');

/* GET home page. */
router.get('/', function(req, res) {
    res.json('Welcome to Affyn API');
});

router.get('/is_alive', (req, res) => {
    res.json('server is alive');
})

router.post('/emailVerification', userController.signUpWithEmail);
router.post('/resendEmailVerification', userController.resendEmail);
router.post('/send_changepassword_request', userController.sendResetPasswordRequestMessage);
//router.post('/signInWithSocial', userController.signInWithSocial);
router.get('/getMerkleRoot', userController.getMerkleRoot);
router.post('/is_whitelisted', userController.checkWhitelisted);

router.post('/connect_wallet', authController.authMiddleware, userController.connectWallet);
router.post('/verifying', authController.authMiddleware, userController.userVerification);
router.put('/update_password', authController.authMiddleware, userController.updatePassword);
router.post('/signin', authController.signin);

module.exports = router;
