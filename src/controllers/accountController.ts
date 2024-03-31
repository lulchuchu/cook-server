import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import NguoiDungModel from "../models/NguoiDung.model";
import { OAuth2Client } from "google-auth-library";

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const SECRET_KEY: Secret = process.env.SECRETKEY as Secret;
const EMAIL = process.env.EMAIL;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
    },
});

const temporaryCode: { [key: string]: number } = {};

class AccountController {
    async register(req: Request, res: Response) {
        const { email, username, password } = req.body;

        try {
            const passwordHash = await bcrypt.hash(password, 8);
            const newUser = new NguoiDungModel({
                email: email,
                password: passwordHash,
                username: username,
                img: "",
                address: "",
                tel: "",
            });

            const token = jwt.sign(
                {
                    email: email,
                    username: username,
                },
                SECRET_KEY
            );

            const savedUser = await newUser.save();
            if (savedUser) {
                res.status(200).send({ token: token });
            } else {
                res.status(403).send({ message: "Register failed" });
            }
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    }

    async generateToken(email: string, username: string): Promise<string> {
        return jwt.sign({ email, username }, SECRET_KEY);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await NguoiDungModel.findOne({ email: email });

            if (!user) {
                return res
                    .status(404)
                    .send({ message: "Không tìm thấy tài khoản." });
            }

            const comparePass = await bcrypt.compare(password, user.password);

            if (!comparePass) {
                return res.status(401).send({ message: "Sai mật khẩu." });
            }

            const token = jwt.sign(
                {
                    email: email,
                    username: user.username,
                },
                SECRET_KEY
            );

            const dataUser = {
                _id: user._id,
                email: email,
                username: user.username,
                img: user.img,
                tel: user.tel,
                address: user.address,
                token: token,
            };

            return res.status(200).send({ user: dataUser });
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).send({ message: "Internal server error." });
        }
    }

    async sendMail(req: Request, res: Response) {
        try {
            const code = Math.floor(1000 + Math.random() * 9000);
            temporaryCode["DieuBX.B20CN123@stu.ptit.edu.vn"] = code;

            const mailOptions = {
                from: EMAIL,
                to: "DieuBX.B20CN123@stu.ptit.edu.vn",
                subject: "Send a message.",
                text: code.toString(),
            };

            await transporter.sendMail(mailOptions);
            res.send({ message: "Email sent successfully" });
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    }

    async verifyEmail(req: Request, res: Response) {
        try {
            const codeVerify = parseInt(req.body.code);
            const storedCode = temporaryCode["DieuBX.B20CN123@stu.ptit.edu.vn"];

            if (codeVerify === storedCode) {
                res.send({ message: "Verified email successfully" });
            } else {
                res.send({ message: "Verified email failed" });
            }
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    }
}

export default new AccountController();
