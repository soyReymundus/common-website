const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env["SMTP_HOST"],
  port: process.env["SMTP_PORT"],
  secure: true,
  auth: {
    user: process.env["SMTP_USERNAME"],
    pass: process.env["SMTP_PASSWORD"],
  }
});

module.exports.send = transporter.sendMail;