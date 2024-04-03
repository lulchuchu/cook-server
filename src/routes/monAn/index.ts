import express from 'express';
import MonAnController from '../../controllers/monAn.controller';

const router = express();

router.get('/get-all', MonAnController.getAll);
router.get('/get-by-diet', MonAnController.getByDiet);
router.get('/get-by-country', MonAnController.getByCountry);
router.get('/get-detail', MonAnController.getDishDetail);

module.exports = router;
