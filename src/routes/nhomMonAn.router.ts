import express from 'express';
const nhomMonAnRouter = express.Router();
import nhomMonAnController from '../controllers/nhomMonAnController';

nhomMonAnRouter.post('/tao', nhomMonAnController.themNhomMonAn);
nhomMonAnRouter.post('/them-mon', nhomMonAnController.addDishToCookBook);
nhomMonAnRouter.get('/lay-tat-ca-nhom-ma', nhomMonAnController.layTatCaNhomMonAnCuaND);
nhomMonAnRouter.get('/lay-tat-ca-ma-trong-nhom/:idNhomMonAn', nhomMonAnController.layTatCaMonAnTrongNhomMA);
nhomMonAnRouter.delete('/xoa-mot-mon-an-khoi-nhom', nhomMonAnController.xoaMonAnKhoiNhom);
nhomMonAnRouter.delete('/:idNhomMonAn', nhomMonAnController.xoaNhomMonAn);

export default nhomMonAnRouter;
