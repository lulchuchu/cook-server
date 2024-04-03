import express from "express";
import thanhPhanDinhDuongController from "../controllers/thanhPhanDinhDuong.controller";

const thanhPhanDinhDuongRouter = express.Router();

thanhPhanDinhDuongRouter.get(
    "/",
    thanhPhanDinhDuongController.getThanhPhanDinhDuongTheoId
);
thanhPhanDinhDuongRouter.get(
    "/:id",
    thanhPhanDinhDuongController.getTatCaThanhPhanDinhDuong
);
thanhPhanDinhDuongRouter.post(
    "/",
    thanhPhanDinhDuongController.themThanhPhanDinhDuong
);

export default thanhPhanDinhDuongRouter;
