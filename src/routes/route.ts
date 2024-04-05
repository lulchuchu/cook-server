const accountRoute = require('./nguoidung/accountRoute');
const blogRoute = require('./community/index');
const cmtBlogRoute = require('./commentBlog/index');
const initDbRoute = require('./initDb/index');
import monAnRoute from './monAn.router';
import nhomMonAnRouter from './nhomMonAn.router';
import danhGiaRouter from './danhGia.router';
import storeRouter from './store.route';

function route(app: any) {
    app.use(function (req: any, res: any, next: any) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept, Authorization');
        next();
    });
    app.use('/user', accountRoute);
    app.use('/user/community', blogRoute);
    app.use('/user/comment/blog', cmtBlogRoute);
    app.use('/init-db', initDbRoute);
    app.use('/dish', monAnRoute);
    app.use('/nhom-mon-an', nhomMonAnRouter);
    app.use('/danh-gia-mon-an', danhGiaRouter);
    app.use('/store', storeRouter);
}

module.exports = route;
