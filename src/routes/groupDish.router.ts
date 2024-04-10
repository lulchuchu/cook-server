import express from 'express';
const cookBookRouter = express.Router();
import groupDishController from '../controllers/groupDishController';

cookBookRouter.post('/create', groupDishController.addCookBook);
cookBookRouter.post('/add-dish', groupDishController.addDishToCookBook);
cookBookRouter.get('/get-all-cookBook', groupDishController.getAllCookBook);
cookBookRouter.get('/get-all-dish-of-cookBook', groupDishController.getAllDishOfCookBook);
cookBookRouter.delete('/erase-dish-from-cookBook', groupDishController.eraseDishFromCookBook);
cookBookRouter.delete('/:idCookBook', groupDishController.eraseCookBook);

export default cookBookRouter;
