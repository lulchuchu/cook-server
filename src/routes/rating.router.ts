import express from 'express';
import ratingController from '../controllers/ratingController';

const ratingRouter = express.Router();

ratingRouter.post('/create', ratingController.createRating);
ratingRouter.post('/erase-rating', ratingController.eraseRating);
ratingRouter.get('/get-rating', ratingController.getRating);

export default ratingRouter;
