import express from 'express';
import dishController from '../controllers/dish.controller';

const dishRouter = express.Router();

dishRouter.get('/get-all', dishController.getAll);
dishRouter.get('/get-by-diet', dishController.getByDiet);
dishRouter.get('/get-by-country', dishController.getByCountry);
dishRouter.get('/get-detail', dishController.getDishDetail);
dishRouter.post('/like-dish', dishController.likeDish);
dishRouter.get('/search', dishController.searchDish);

export default dishRouter;
