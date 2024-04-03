import express from "express";
import monAnController from "../controllers/monAn.controller";

const monAnRoute = express.Router();

monAnRoute.post("/", monAnController.taoMon);
monAnRoute.get('/get-all', monAnController.getAll);
monAnRoute.get('/get-by-diet', monAnController.getByDiet);
monAnRoute.get('/get-by-country', monAnController.getByCountry);
monAnRoute.get('/get-detail', monAnController.getDishDetail);
monAnRoute.get("/:id", monAnController.layMonTheoId);
monAnRoute.post("/luu-mon-an", monAnController.luuMonAn);
monAnRoute.post("/bo-luu-mon-an", monAnController.boLuuMonAn);
monAnRoute.post("/tha-like-mon-an", monAnController.likeMonAn);

export default monAnRoute;
