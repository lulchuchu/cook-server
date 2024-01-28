import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { checkOverload } from "./helpers/check.connect";

export const app = express();

//init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
//init db
import "./db/init.mongodb";
// checkOverload();
//init routes
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello World!",
    });
});

//handling errors
