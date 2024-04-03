const accountRoute = require('./nguoidung/accountRoute');
const blogRoute = require('./community/index');
const cmtBlogRoute = require('./commentBlog/index');
const initDbRoute = require('./initDb/index');
const monAnRoute1 = require('./monAn/index');
import axios from "axios";
import monAnRoute from "./monAn.router";
import nhomMonAnRouter from "./nhomMonAn.router";
import danhGiaRouter from "./danhGia.router";

function route(app: any) {
    app.use(function (req: any, res: any, next: any) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept, Authorization');
        next();
    });
    app.use('/user', accountRoute);
    app.use('/user/community', blogRoute);
    app.use('/user/comment/blog', cmtBlogRoute);
    app.use('/dish', monAnRoute1);
    app.use('/init-db', initDbRoute);
    app.use("/mon-an", monAnRoute);
    app.use("/nhom-mon-an", nhomMonAnRouter);
    app.use("/danh-gia-mon-an", danhGiaRouter);
}

module.exports = route;
