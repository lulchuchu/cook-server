const express = require('express');
const router = express.Router();

const accountController = require('../../controllers/accountController');
const verifySignUp = require('../../middleware/verisySignUp');

router.post('/register',verifySignUp.verify, accountController.register);
router.post('/login', accountController.login);
router.post('/send/mail', accountController.sendMail);
router.post('/verify/email', accountController.verifyEmail);

module.exports = router;