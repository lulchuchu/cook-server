import express from 'express';
import commentDishController from '../controllers/commentDishController';

const commentDishRouter = express.Router();

commentDishRouter.get('/get-all', commentDishController.getListCommentDish);
commentDishRouter.post('/create', commentDishController.createCommentDish);
commentDishRouter.post('/create-feeling', commentDishController.createFeelingCommentDish);
commentDishRouter.delete('/delete', commentDishController.deleteCommentDish);

export default commentDishRouter;
