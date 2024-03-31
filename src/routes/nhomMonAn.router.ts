import express from "express";
const nhomMonAnRouter = express.Router();
import nhomMonAnController from "../controllers/nhomMonAnController";

nhomMonAnRouter.post("/tao", nhomMonAnController.themNhomMonAn);
nhomMonAnRouter.get(
    "/lay-tat-ca-nhom-ma/:idNguoiDung",
    nhomMonAnController.layTatCaNhomMonAnCuaND
);
nhomMonAnRouter.get(
    "/lay-tat-ca-ma-trong-nhom/:idNhomMonAn",
    nhomMonAnController.layTatCaMonAnTrongNhomMA
);
nhomMonAnRouter.delete(
    "/xoa-mot-mon-an-khoi-nhom",
    nhomMonAnController.xoaMonAnKhoiNhom
);
nhomMonAnRouter.delete("/:idNhomMonAn", nhomMonAnController.xoaNhomMonAn);

export default nhomMonAnRouter;
