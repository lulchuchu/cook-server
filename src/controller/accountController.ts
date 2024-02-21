import { Request, Response } from "express";
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const emailVerificationTokens: { [key: string]: string } = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    }
});

class accountController {
    async register(req: Request, res: Response) {
        try {
            const data = req.body;
            const email = data.email;

            const verificationToken = await jwt.sign({ email }, process.env.SECRETKEY, { expiresIn: '1h' });

            emailVerificationTokens[email] = verificationToken;

            const verificationUrl = `http://localhost:3056/verify?token=${verificationToken}`;

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Email verification",
                text: `Please click on the following link to verify your account: ${verificationUrl}`
            };

            transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    console.log('Error sending email: ' + error);
                    res.status(500).send('Error sending email: ' + error);
                } else {
                    console.log('Email sent: ', info.response);
                    res.status(200).send(`An email has been sent to ${email}`);
                }
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new accountController;
