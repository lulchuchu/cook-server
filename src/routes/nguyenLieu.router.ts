import express from "express";
import nguyenLieuController from "../controllers/nguyenLieu.controller";

const nguyenLieuRoute = express.Router();

nguyenLieuRoute.post("/", nguyenLieuController.themNguyenLieu);
nguyenLieuRoute.post(
    "/them-nguyen-lieu-dinh-duong",
    nguyenLieuController.themNguyenLieuVaThanhPhanDinhDuong
);
nguyenLieuRoute.get("/:id", nguyenLieuController.layNguyenLieuTheoId);
nguyenLieuRoute.get("/", nguyenLieuController.layTatCaNguyenLieu);

export default nguyenLieuRoute;
