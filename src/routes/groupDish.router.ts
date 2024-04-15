import express from 'express';
<<<<<<< HEAD
const groupDishRouter = express.Router();
import groupDishController from '../controllers/groupDishController';

groupDishRouter.post('/create', groupDishController.addCookBook);
groupDishRouter.post('/add-dish', groupDishController.addDishToCookBook);
groupDishRouter.get('/get-all-cookBook', groupDishController.getAllCookBook);
groupDishRouter.get('/get-all-dish-of-cookBook', groupDishController.getAllDishOfCookBook);
groupDishRouter.delete('/erase-dish', groupDishController.eraseDishFromCookBook);
groupDishRouter.delete('/erase', groupDishController.eraseCookBook);
=======
const cookBookRouter = express.Router();
import groupDishController from '../controllers/groupDishController';

cookBookRouter.post('/create', groupDishController.addCookBook);
cookBookRouter.post('/add-dish', groupDishController.addDishToCookBook);
cookBookRouter.get('/get-all-cookBook', groupDishController.getAllCookBook);
cookBookRouter.get('/get-all-dish-of-cookBook', groupDishController.getAllDishOfCookBook);
cookBookRouter.delete('/erase-dish-from-cookBook', groupDishController.eraseDishFromCookBook);
cookBookRouter.delete('/:idCookBook', groupDishController.eraseCookBook);
>>>>>>> 46d4fe4bdd3bb65a3714ce815dfba2e70652c86f

export default groupDishRouter;
