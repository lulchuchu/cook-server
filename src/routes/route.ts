const accountRoute = require('./nguoidung/accountRoute');
const axios = require('axios');

function route(app : any) {
    app.use(function(req:any, res:any, next:any) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    });
    app.use('/user', accountRoute);
};

module.exports = route;

