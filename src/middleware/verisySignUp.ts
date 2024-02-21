import { Request, Response } from "express";
const accountModel = require('../models/account');

class verifySignUp {
    verify(req: Request, res: Response, next: any) {
        const email = req.body.email;

        accountModel.findOne({ email: email})
            .then((account: object) => {
                if (account) {
                    res.status(200).send({ message: "Email registered!"});
                }
                else {
                    res.status(200).send({ message: "Email not register!"});
                }
            })
            .catch((err: any) => {
                res.status(500).send({ message: err.message});
            });
    };
};

module.exports = new verifySignUp;
