import express from "express";
import danhGiaController from "../controllers/danhGiaController";

const danhGiaRouter = express.Router();

danhGiaRouter.post("/tao-danh-gia", danhGiaController.themDanhGia);
danhGiaRouter.post("/xoa-danh-gia", danhGiaController.xoaDanhGia);
danhGiaRouter.get("/lay-danh-gia/:idMonAn", danhGiaController.layTatCaDanhGia);

export default danhGiaRouter;
