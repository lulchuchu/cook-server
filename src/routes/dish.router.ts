import express from 'express';
import dishController from '../controllers/dish.controller';

const monAnRoute = express.Router();

monAnRoute.get('/get-all', dishController.getAll);
monAnRoute.get('/get-by-diet', dishController.getByDiet);
monAnRoute.get('/get-by-country', dishController.getByCountry);
monAnRoute.get('/get-detail', dishController.getDishDetail);
monAnRoute.post('/save-dish', dishController.saveDish);
monAnRoute.post('/unsave-dish', dishController.unsaveDish);
monAnRoute.post('/like-dish', dishController.likeDish);

export default monAnRoute;
