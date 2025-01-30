import nodemailer from "nodemailer";
import env from "../config/env";

const transporter = nodemailer.createTransport({
  host: env.email_host,
  port: Number(env.email_port),
  secure: Number(env.email_port) === 465,
  auth: {
    user: env.email_username,
    pass: env.email_password,
  },
});

export const sendVerificationEmail = async (email: string, code: string) => {
  await transporter.sendMail({
    from: `"Auth Service" <${env.email_username}>`,
    to: email,
    subject: "Email Verification",
    html: `Here is your verification code ${code}.`,
  });
};
