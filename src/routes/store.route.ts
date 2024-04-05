import express from 'express';
const router = express.Router();
import storeController from '../controllers/store.controller';

router.get('/calculate-distance', storeController.countDistance);

export default router;
