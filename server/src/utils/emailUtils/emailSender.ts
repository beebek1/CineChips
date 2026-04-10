import nodemailer from "nodemailer";
import { ApiError } from "../apiError.js";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"CINECHIPS" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    throw new ApiError(500, "Failed to send email");
  }
};

export const emailSender = async (
  email: string,
  subject: string,
  html: string,
) => {
  if (!email || !subject || !html) {
    throw new ApiError(400, "Email, subject and html content are required");
  }

  await sendEmail({ to: email, subject, html });
};

export default emailSender;
