const accountRoute = require('./nguoidung/accountRoute');
const blogRoute = require('./community/index');
const cmtBlogRoute = require('./commentBlog/index');
const initDbRoute = require('./initDb/index');
const monAnRoute = require('./monAn/index');

function route(app: any) {
    app.use(function (req: any, res: any, next: any) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept, Authorization');
        next();
    });
    app.use('/user', accountRoute);
    app.use('/user/community', blogRoute);
    app.use('/user/comment/blog', cmtBlogRoute);
    app.use('/dish', monAnRoute);
    app.use('/init-db', initDbRoute);
}

module.exports = route;
