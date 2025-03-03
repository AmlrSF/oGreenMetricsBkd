const OTPSchema = require("../../Domain/Entities/OTP");
const crypto = require('crypto');
const sendEmail = require('./sendEmail');

const sendOTP = async({ email, subject, duration }) => {
  try {
    const otp = crypto.randomInt(1000, 9999).toString();
    
    // Split OTP into individual digits for styling
    const otpDigits = otp.split('');
    
    // Save OTP to the database with expiration
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
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .logo {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo img {
            max-width: 200px;
          }
          .otp-container {
            text-align: center;
            margin: 30px 0;
          }
          .otp-digits {
            display: flex;
            gap: 10px;
            justify-content:center;
            justify-items:center;
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
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <a href='https://postimages.org/' target='_blank'><img src='https://i.postimg.cc/mr0MjrC5/green-Metric-09-02-1-7.png' border='0' alt='green-Metric-09-02-1-7'/></a>
          <div
      <a href='https://postimages.org/' target='_blank'><img src='https://i.postimg.cc/KvJMVftL/freepik-Characters-inject-2-3.png' border='0' alt='freepik-Characters-inject-2-3'/></a>
      
          <p>Hi ${email.split('@')[0]},</p>
          
          <p>Here is your One Time Password (OTP).<br>
          Please enter this code to verify your email address for Circo</p>
          
          <div class="otp-container">
            <div class="otp-digits">
              ${otpDigits.map(digit => `<span class="otp-digit">${digit}</span>`).join('')}
            </div>
          </div>
          
          <p>OTP will expire in ${duration} minutes.</p>
          
          <p>GreenMetric Team.</p>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} GreenMetric. All rights reserved.</p>
            <p>You are receiving this mail because you have requested password reset in Green Metric platform.<br>
            This also shows that you agree to our Terms of use and Privacy Policies.</p>
          </div>
        </div>
      </body>
      </html>
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