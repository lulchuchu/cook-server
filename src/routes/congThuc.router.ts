import express from "express";
import congThucController from "../controllers/congThuc.controller";

const congThucRouter = express.Router();

congThucRouter.get("/", congThucController.layTatCaCongThuc);
congThucRouter.get("/:id", congThucController.layCongThucTheoIdDetail);
congThucRouter.post("/", congThucController.themCongThuc);
congThucRouter.post(
    "/taoCongThucCungNguyenLieu",
    congThucController.taoCongThucCungNguyenLieu
);
congThucRouter.post(
    "/taoCongThucVaThemVaoMonAn",
    congThucController.taoCongThucVaThemVaoMonAn
);

export default congThucRouter;
