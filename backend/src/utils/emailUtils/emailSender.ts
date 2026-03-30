import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async ({ to, subject, html }: EmailOptions): Promise<void> => {
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
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const emailSender = async (
  email: string,
  subject: string,
  html: string
): Promise<void> => {
  console.log(`Preparing email for: ${email} | Subject: ${subject}`);

  await sendEmail({
    to: email,
    subject,
    html,
  });
};

export default emailSender;