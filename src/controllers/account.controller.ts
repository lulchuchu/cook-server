import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import AccountModel from '../models/Account.model';
import { OAuth2Client } from 'google-auth-library';
import bucket from '../configs/firebase';

require('dotenv').config();

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
    service: 'gmail',
    auth: {
        type: 'OAuth2',
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
            const newUser = new AccountModel({
                email: email,
                password: passwordHash,
                username: username,
                img: '',
                address: '',
                tel: '',
                emailVerified: false,
                diet: '',
                selectCountry: [],
            });

            const token = jwt.sign(
                {
                    email: email,
                    username: username,
                },
                SECRET_KEY,
            );

            const dataUser = {
                _id: newUser._id,
                email: email,
                username: username,
                img: newUser.img,
                tel: newUser.tel,
                address: newUser.address,
                token: token,
                diet: '',
                selectCountry: [],
                emailVerified: newUser.emailVerified,
            };

            const savedUser = await newUser.save();
            if (savedUser) {
                res.status(200).send({ user: dataUser });
            } else {
                res.status(403).send({ message: 'Register failed' });
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
            const user = await AccountModel.findOne({ email: email });

            if (!user) {
                return res.status(404).send({ message: 'Không tìm thấy tài khoản.' });
            }

            const comparePass = await bcrypt.compare(password, user.password);

            if (!comparePass) {
                return res.status(401).send({ message: 'Sai mật khẩu.' });
            }

            const token = jwt.sign(
                {
                    email: email,
                    username: user.username,
                },
                SECRET_KEY,
            );

            const dataUser = {
                _id: user._id,
                email: email,
                username: user.username,
                img: user.img,
                tel: user.tel,
                address: user.address,
                token: token,
                emailVerified: user.emailVerified,
                diet: user.diet,
                selectCountry: user.selectCountry,
            };

            return res.status(200).send({ user: dataUser });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).send({ message: 'Internal server error.' });
        }
    }

    async sendMail(req: Request, res: Response) {
        try {
            const code = Math.floor(1000 + Math.random() * 9000);
            const email = req.body.email;
            temporaryCode[email] = code;
            const text = `Mã xác minh đăng ký email của bạn là: ${code.toString()}`;

            const mailOptions = {
                from: EMAIL,
                to: email,
                subject: 'Verify registration email from Kitchen Stories.',
                text: text.toString(),
            };

            await transporter.sendMail(mailOptions);
            res.status(200).send({ message: 'Email sent successfully' });
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    }

    async verifyEmail(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const code = req.body.code;
            const storedCode = temporaryCode[email];

            if (code === storedCode) {
                await AccountModel.updateOne({ email: email }, { $set: { emailVerified: true } });
                delete temporaryCode[email];
                res.send({ message: 'Verified email successfully' });
            } else {
                res.send({ message: 'Verified email failed' });
            }
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    }

    async selectDiet(req: Request, res: Response): Promise<void> {
        try {
            const diet = req.body.diet;
            const _id = req.body._id;

            const update = await AccountModel.updateOne(
                { _id: _id },
                {
                    $set: { diet: diet },
                },
            );
            if (!update) {
                res.status(401).send({ message: 'Invalid diet option!' });
            } else {
                res.status(200).send({ message: 'Success' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async selectCountry(req: Request, res: Response): Promise<void> {
        try {
            const country = req.body.country;
            const _id = req.body._id;

            const update = await AccountModel.updateOne(
                { _id: _id },
                {
                    $set: { selectCountry: country },
                },
            );
            if (!update) {
                res.status(401).send({ message: 'Invalid country option!' });
            } else {
                res.status(200).send({ message: 'Success' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            const { _id, username, img, address, tel } = req.body;
            if (img !== '') {
                const decodedImage = Buffer.from(img.uri, 'base64');
                const filename = `userImage/${username}.${img.type}`;
                const file = bucket.file(filename);

                await file.save(decodedImage, {
                    metadata: {
                        contentType: `image/${img.type}`,
                    },
                });

                const url = await file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491',
                });
                let imgUri = url[0];
                const update = await AccountModel.updateOne(
                    { _id: _id },
                    {
                        $set: {
                            username,
                            img: imgUri,
                            address,
                            tel,
                        },
                    },
                );
                if (update) {
                    const user = await AccountModel.findById(_id);
                    const token = jwt.sign(
                        {
                            email: user?.email,
                            username,
                        },
                        SECRET_KEY,
                    );

                    const dataUser = {
                        _id: user?._id,
                        email: user?.email,
                        username,
                        img: user?.img,
                        tel: tel,
                        address: address,
                        token: token,
                        emailVerified: user?.emailVerified,
                        diet: user?.diet,
                        selectCountry: user?.selectCountry,
                    };
                    res.status(200).send(dataUser);
                } else {
                    res.status(401).send({ message: 'Failed' });
                }
            } else {
                const update = await AccountModel.updateOne(
                    { _id: _id },
                    {
                        $set: {
                            username,
                            address,
                            tel,
                        },
                    },
                );
                if (update) {
                    const user = await AccountModel.findById(_id);
                    const token = jwt.sign(
                        {
                            email: user?.email,
                            username,
                        },
                        SECRET_KEY,
                    );

                    const dataUser = {
                        _id: user?._id,
                        email: user?.email,
                        username,
                        img: user?.img,
                        tel: tel,
                        address: address,
                        token: token,
                        emailVerified: user?.emailVerified,
                        diet: user?.diet,
                        selectCountry: user?.selectCountry,
                    };
                    res.status(200).send(dataUser);
                } else {
                    res.status(401).send({ message: 'Failed' });
                }
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }
}
export default new AccountController();
