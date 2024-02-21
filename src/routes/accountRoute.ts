const express = require('express');
const router = express.Router();

const accountController = require('../controller/accountController');
const verifySignUp = require('../middleware/verisySignUp');

router.post('/register', accountController.register);
router.post('/verify', verifySignUp.verify);

module.exports = router;