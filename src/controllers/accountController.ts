import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
import NguoiDungModel from "../models/NguoiDung.model";
import { OAuth2Client } from 'google-auth-library';

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDICT_URI = process.env.REDICT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDICT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        pass: process.env.PASS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: oAuth2Client.getAccessToken(),
    }
});

var temporaryCode : any = [];

class accountController {
    async register(req: Request, res: Response) {
        const {email, username, password} = req.body;

        const passwordHash = await bcrypt.hash(password, 8);

        const newUser = new NguoiDungModel({
            email: email,
            password: passwordHash,
            username: username,
            img: "",
            address: "",
            tel: ""
        });

        const token = jwt.sign({
            email: email,
            username: username,
        }, process.env.SECRETKEY);

        try {
            const savedUser = await newUser.save();
            if (savedUser) {
                res.status(200).send({token: token});
            }
            else {
                res.status(401).send({'message': 'Account not saved'});
            }
        }
        catch(err: any) {
            res.status(500).send({'message': err.message});
        }
    };

    async login(req: Request, res: Response) {
        const {email, password} = req.body;
        const user = await NguoiDungModel.findOne({email: email});

        if (user) {
            const conmparePass = bcrypt.compareSync(password, user.password);

            if (conmparePass) {
                const dataUser = {
                    email: email,
                    username: user.username,
                    img: user.img,
                    tel: user.tel,
                    address: user.address,
                    token: jwt.sign({
                        email: email,
                        username: user.username,
                    }, process.env.SECRETKEY)
                };

                res.status(200).send({user: dataUser});
            }
            else {
                res.status(200).send({'message': 'Sai mật khẩu.'});
            }
        }
        else {
            res.status(500).send({'message': 'Không tìm thấy tài khoản.'});
        }
    }

    async sendMail(req : Request, res: Response) {
        const code = Math.floor(1000 + Math.random() * 9000);
        temporaryCode.push(code);

        var mailOptions = {
            from: process.env.EMAIL,
            to: "DieuBX.B20CN123@stu.ptit.edu.vn",
            subject: "Send a message.",
            text: code.toString(),
        };

        transporter.sendMail(mailOptions, function(err : any, info : any) {
            if (err) {
                res.send({'message': err.message});
            }
            if (info) {
                res.send({'Email sent': info.response});
            }
        })
    }

    async verifyEmail(req: Request, res: Response) {
        const codeVerify = req.body.code;
        console.log(temporaryCode.pop());

        if (codeVerify === temporaryCode.pop()) {
            res.send({'message': 'Verified email successfully'});
        }
        else {
            res.send({'message': 'Verified email failed'});
        }
    }
}

module.exports = new accountController;
