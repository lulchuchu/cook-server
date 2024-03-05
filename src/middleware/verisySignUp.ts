import { Request, Response } from "express";
const accountModel = require('../models/NguoiDung.model');

class verifySignUp {
    async verify(req: Request, res: Response, next: any) {
        const email = req.body.email;

        try {
            const account = await accountModel.findOne({ email: email}).exec();
            if (account) {
                res.status(400).send({message: "Email registered!"});
                return;
            }
            next();
        } catch (err: any) {
            res.status(err.status).send({message: err.message});
        }
    }
};

module.exports = new verifySignUp;