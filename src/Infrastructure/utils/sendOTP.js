const OTPSchema = require("../../Domain/Entities/OTP");
const crypto = require("crypto");
const sendEmail = require("./sendEmail");

const sendOTP = async ({ email, subject, duration }) => {
  try {
    const otp = crypto.randomInt(1000, 9999).toString();

    
    const otpDigits = otp.split("");

    
    await OTPSchema.create({
      email,
      otp: otp,
      expiresAt: new Date(Date.now() + duration * 60 * 1000),
    });

    // Email HTML template
    const emailContent = `
      <!DOCTYPE html>
<html>
<head>
  <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        background-color: #f3f3f3; /* Light gray background */
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
      }
      .email-container {
        max-width: 600px;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .email-container > p {
        text-align: left;
      }

      .email-container > p strong {
        color: #8ebe21;
      }
      .logo img {
        max-width: 200px;
      }
      .otp-container {
        margin: 30px 0;
        width:600px;
      }
      .otp-digits {
        display: flex;
        justify-content: center;
        align-items: center;    
        gap: 10px;
        margin: 20px 0;
      }
      .otp-digit {
        background-color: #f8f0ff;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #666;
      }
    </style>
</head>
<body>
  <div class="email-container">
    <div class="logo">
      <img src="https://i.postimg.cc/mr0MjrC5/green-Metric-09-02-1-7.png" alt="Green Metric Logo">
    </div>
    
    <img src="https://i.postimg.cc/KvJMVftL/freepik-Characters-inject-2-3.png" alt="Illustration" style="max-width:100%; border-radius: 10px;">
    
    <p>Hi ${email.split("@")[0]},</p>
    
    <p>Here is your One Time Password (OTP).<br>
    Please enter this code to verify your email address for Circo</p>
    
    <div class="otp-container">
      <div class="otp-digits">
        ${otpDigits
          .map((digit) => `<span class="otp-digit">${digit}</span>`)
          .join("")}
      </div>
    </div>
    
    <p>OTP will expire in <strong>${duration} minutes</strong>.</p>
    
    <p><strong>GreenMetric Team.</strong></p>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} GreenMetric. All rights reserved.</p>
      <p>You are receiving this mail because you have requested a password reset in the Green Metric platform.<br>
      This also shows that you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policies</a>.</p>
    </div>
  </div>
</body>
</html>

    `;

    await sendEmail(email, subject, emailContent);

    return { success: true, message: "OTP sent successfully!" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP.");
  }
};

module.exports = sendOTP;
