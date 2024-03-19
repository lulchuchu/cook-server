import { Request, Response, NextFunction } from "express";
import NguoiDungModel from "../models/NguoiDung.model";

class VerifySignUp {
    async verify(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;
        const account = await NguoiDungModel.findOne({ email: email });
        if (account) {
            return res.status(400).send({message: 'Email is already registered.' });
        }
        else {
            next();
        }
    }
}

export default new VerifySignUp();
