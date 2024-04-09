import accountRoute from './account/accountRoute';
import blogRoute from './community/index';
import cmtBlogRoute from './commentBlog/index';
const initDbRoute = require('./initDb/index');
import storeRoute from './store.route';
import dishRoute from './dish.router';
import cookBookRoute from './groupDish.router';
import ratingRoute from './rating.router';
import commentDishRouter from './commentDish.router';

function route(app: any) {
    app.use(function (req: any, res: any, next: any) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept, Authorization, Access-Control-Allow-Origin');
        next();
    });
    app.use('/user', accountRoute);
    app.use('/user/community', blogRoute);
    app.use('/user/comment/blog', cmtBlogRoute);
    app.use('/init-db', initDbRoute);
    app.use('/dish', dishRoute);
    app.use('/store', storeRoute);
    app.use('/cook-book', cookBookRoute);
    app.use('/rating-dish', ratingRoute);
    app.use('/comment-dish', commentDishRouter);
}

module.exports = route;
