const OTPSchema = require("../../Domain/Entities/OTP");
const crypto = require('crypto');
const sendEmail = require('./sendEmail');



const sendOTP = async({ email, subject, message, duration }) => {
  try {
    
    const otp = crypto.randomInt(1000, 9999).toString();



 
    // Save OTP to the database with expiration
    await OTPSchema.create({
      email,
      otp: otp,
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


module.exports = sendOTP;