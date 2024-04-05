import express from 'express';
import createDB from '../../controllers/addDB';
const router = express.Router();

router.post('/add-ingredients', createDB.createIngredients);
router.post('/add-store', createDB.addStore);

module.exports = router;
