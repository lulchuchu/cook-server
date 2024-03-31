require("dotenv").config();

const auth = {
    type: "OAuth2",
    user: "buiquangtuan0812@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
};

const mailOptions = {
    from : "buiquangtuan0812@gmail.com",
    to: "vutrang09022003@gmail.com",
    subject: "Gmail API NodeJS",
};

module.exports = {auth, mailOptions};