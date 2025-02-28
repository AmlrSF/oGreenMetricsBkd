import nodemailer from "nodemailer";

export default async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}
