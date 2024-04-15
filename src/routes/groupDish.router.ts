import express from 'express';
const groupDishRouter = express.Router();
import groupDishController from '../controllers/groupDishController';

groupDishRouter.post('/create', groupDishController.addCookBook);
groupDishRouter.post('/add-dish', groupDishController.addDishToCookBook);
groupDishRouter.get('/get-all-cookBook', groupDishController.getAllCookBook);
groupDishRouter.get('/get-all-dish-of-cookBook', groupDishController.getAllDishOfCookBook);
groupDishRouter.delete('/erase-dish', groupDishController.eraseDishFromCookBook);
groupDishRouter.delete('/erase', groupDishController.eraseCookBook);

export default groupDishRouter;
