import express from "express";
import MonAnService from "../services/monAn.service";
import monAnController from "../controllers/monAn.controller";

const monAnRoute = express.Router();

monAnRoute.post("/", monAnController.taoMon);
monAnRoute.get("/", monAnController.layTatCaMon);
monAnRoute.get("/:id", monAnController.layMonTheoId);
monAnRoute.post("/luu-mon-an", monAnController.luuMonAn);
monAnRoute.post("/bo-luu-mon-an", monAnController.boLuuMonAn);
monAnRoute.post("/tha-like-mon-an", monAnController.likeMonAn);

export default monAnRoute;
