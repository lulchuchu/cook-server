import express from 'express';
const router = express.Router();

import accountController from '../../controllers/account.controller';
import cartController from '../../controllers/cart.controller';
import verifySignUp from '../../middleware/verisySignUp';

router.post('/register', [verifySignUp.verify], accountController.register);
router.post('/login', accountController.login);
router.post('/update-profile', accountController.updateProfile);
router.post('/send/mail', accountController.sendMail);
router.post('/verify/email', accountController.verifyEmail);
router.post('/select-diet', accountController.selectDiet);
router.post('/select-country', accountController.selectCountry);
router.post('/add-to-cart', cartController.addCart);
router.get('/get-all-cart', cartController.getCart);
router.post('/verify-cart', cartController.updateCart);

module.exports = router;
