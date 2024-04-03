const cors = require('cors');
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
export const app = express();

//init middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));

//init db
import './db/init.mongodb';
const route = require('./routes/route');
// checkOverload();

//init routes
route(app);
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hello World!',
    });
});
