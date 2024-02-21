import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import monAnRoute from "./routes/monAn";
import bodyParser from "body-parser";
export const app = express();

//init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

//init db
import "./db/init.mongodb";
// checkOverload();
//init routes
app.use("/api/monAn", monAnRoute);
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello World!",
    });
});

//handling errors
