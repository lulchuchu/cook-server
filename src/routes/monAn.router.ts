import express from "express";
import MonAnService from "../services/monAn.service";
import monAnController from "../controllers/monAn.controller";

const monAnRoute = express.Router();

monAnRoute.post("/", monAnController.taoMon);
monAnRoute.get("/", monAnController.layTatCaMon);
monAnRoute.get("/:id", monAnController.layMonTheoId);

export default monAnRoute;