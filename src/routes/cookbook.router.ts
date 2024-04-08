import express from 'express';
const cookBookRouter = express.Router();
import cookBookController from '../controllers/cookBookController';

cookBookRouter.post('/create', cookBookController.addCookBook);
cookBookRouter.post('/add-dish', cookBookController.addDishToCookBook);
cookBookRouter.get('/get-all-cookBook', cookBookController.getAllCookBook);
cookBookRouter.get('/get-all-dish-of-cookBook', cookBookController.getAllDishOfCookBook);
cookBookRouter.delete('/erase-dish-from-cookBook', cookBookController.eraseDishFromCookBook);
cookBookRouter.delete('/:idCookBook', cookBookController.eraseCookBook);

export default cookBookRouter;
