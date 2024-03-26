import axios from "axios";
import monAnRoute from "./monAn.router";
import nguoiDungRoute from "./nguoiDung.router";
import nguyenLieuRoute from "./nguyenLieu.router";
import congThucRouter from "./congThuc.router";
import thanhPhanDinhDuongRouter from "./thanhPhanDinhDuong.router";

function route(app: any) {
    app.use(function (req: any, res: any, next: any) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    });
    app.use("/user", nguoiDungRoute);
    app.use("/mon-an", monAnRoute);
    app.use("/nguyen-lieu", nguyenLieuRoute);
    app.use("/cong-thuc", congThucRouter);
    app.use("/thanh-phan-dinh-duong", thanhPhanDinhDuongRouter);
}

module.exports = route;
