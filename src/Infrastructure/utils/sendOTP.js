import crypto from "crypto";
import OTPModel from "../models/OTPModel"; // Assuming you store OTPs in a DB
import sendEmail from "./sendEmail"; // Email sending utility

export async function sendOTP({ email, subject, message, duration }) {
  try {
    
    const otp = crypto.randomInt(100000, 999999).toString();

    
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Save OTP to the database with expiration
    await OTPModel.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + duration * 60 * 1000), // Convert minutes to milliseconds
    });

    // Email content
    const emailContent = `
      <p>${message}</p>
      <h3 style="color: blue;">${otp}</h3>
      <p>This OTP is valid for ${duration} minutes.</p>
    `;

    // Send email
    await sendEmail(email, subject, emailContent);

    return { success: true, message: "OTP sent successfully!" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP.");
  }
}
