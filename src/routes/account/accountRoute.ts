import express from 'express';
const router = express.Router();

import accountController from '../../controllers/account.controller';
import cartController from '../../controllers/cart.controller';
import dishController from '../../controllers/dish.controller';
import verifySignUp from '../../middleware/verisySignUp';

router.post('/register', [verifySignUp.verify], accountController.register);
router.post('/login', accountController.login);
router.post('/update-profile', accountController.updateProfile);
router.post('/send/mail', accountController.sendMail);
router.post('/verify/email', accountController.verifyEmail);
router.post('/select-diet', accountController.selectDiet);
router.post('/select-country', accountController.selectCountry);
router.post('/add-to-cart', cartController.addCart);
router.post('/confirm-cart', cartController.updateCart);
router.post('/cancel-cart', cartController.cancelCart);
router.get('/get-all-cart', cartController.getCart);
router.get('/get-dish-liked', dishController.getLikedOfUser);
router.post('/verify-cart', cartController.updateCart);

export default router;
