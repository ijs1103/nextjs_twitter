import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: process.env.NEXT_PUBLIC_MAIL_ID,
    pass: process.env.NEXT_PUBLIC_MAIL_PW,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default smtpTransport;
