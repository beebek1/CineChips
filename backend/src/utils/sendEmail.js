import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {

  console.log(process.env.EMAIL_PASS);
  console.log(process.env.EMAIL_USER);
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"CINECHIPS" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;
