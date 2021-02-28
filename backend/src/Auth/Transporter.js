import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
});

export default Transporter;