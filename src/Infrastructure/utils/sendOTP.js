const OTPSchema = require("../../Domain/Entities/OTP");
const crypto = require("crypto");
const sendEmail = require("./sendEmail");

// Configuration options with defaults
const DEFAULT_CONFIG = {
  otpLength: 4,
  minValue: 1000,
  maxValue: 9999,
  duration: 5, // minutes
  images: {
    logo: "https://res.cloudinary.com/dwm5fb9l0/image/upload/v1742373154/dcfdcb92c18cf315b94e9d907530b620_mjqtls.png",
    illustration: "https://res.cloudinary.com/dwm5fb9l0/image/upload/v1742373226/Reset_password-pana_1_tjsomi.png"
  },
  brandName: "GreenMetric",
  productName: "Circo",
  brandColor: "#8ebe21",
  styles: {
    backgroundColor: "#f3f3f3",
    otpDigitBg: "#f8f0ff",
    textColor: "#333333",
    containerMaxWidth: "600px"
  }
};

// Email template generator
const generateEmailTemplate = ({
  email,
  otpDigits,
  duration,
  config
}) => {
  const username = email.split("@")[0];
  const currentYear = new Date().getFullYear();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${config.brandName} - Email Verification</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: ${config.styles.backgroundColor};
          font-family: Arial, sans-serif;
        }
        .email-wrapper {
          width: 100%;
          max-width: ${config.styles.containerMaxWidth};
          margin: 0 auto;
          background-color: #ffffff;
            border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 
                      0 1px 3px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        .otp-digit {
          background-color: ${config.styles.otpDigitBg};
          padding: 12px;
          border-radius: 8px;
          font-size: 24px;
          font-weight: bold;
          color: ${config.styles.textColor};
          display: inline-block;
          width: 20px;
          text-align: center;
          margin: 0 5px;
        }
        .brand-color {
          color: ${config.brandColor};
        }
      </style>
    </head>
    <body>
      <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <!-- Logo -->
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <img src="${config.images.logo}" alt="${config.brandName}" width="100" style="display: block;">
                </td>
              </tr>
              
              <!-- Illustration -->
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <img src="${config.images.illustration}" alt="" width="150" style="display: block; border-radius: 10px;">
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 20px 0;">
                  <p style="margin: 0 0 16px;">Hi ${username},</p>
                  <p style="margin: 0 0 16px;">
                    Here is your One Time Password (OTP).<br>
                    Please enter this code to verify your email address for ${config.productName}
                  </p>
                </td>
              </tr>
              
              <!-- OTP Numbers -->
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <table cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      ${otpDigits.map(digit => `
                        <td style="padding: 0 5px;">
                          <div class="otp-digit">${digit}</div>
                        </td>
                      `).join('')}
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Expiry -->
              <tr>
                <td style="padding: 20px 0;">
                  <p style="margin: 0;">OTP will expire in <strong class="brand-color">${duration} minutes</strong>.</p>
                </td>
              </tr>
              
              <!-- Signature -->
              <tr>
                <td style="padding: 20px 0;">
                  <p style="margin: 0;" class="brand-color"><strong>${config.brandName} Team.</strong></p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 20px 0; border-top: 1px solid #e5e5e5;">
                  <p style="margin: 0 0 8px; font-size: 12px; color: #666666; text-align: center;">
                    © ${currentYear} ${config.brandName}. All rights reserved.
                  </p>
                  <p style="margin: 0; font-size: 12px; color: #666666; text-align: center;">
                    You are receiving this mail because you have requested password reset in ${config.brandName} platform.<br>
                    This also shows that you agree to our Terms of Use and Privacy Policies.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Generate OTP
const generateOTP = (length, min, max) => {
  return crypto.randomInt(min, max).toString().padStart(length, '0');
};

// Main function
const sendOTP = async ({ 
  email, 
  subject,
  duration = DEFAULT_CONFIG.duration,
  config = {} 
}) => {
  try {
    // Merge default config with custom config
    const finalConfig = {
      ...DEFAULT_CONFIG,
      ...config,
      styles: {
        ...DEFAULT_CONFIG.styles,
        ...(config.styles || {})
      },
      images: {
        ...DEFAULT_CONFIG.images,
        ...(config.images || {})
      }
    };

    // Generate OTP
    const otp = generateOTP(
      finalConfig.otpLength, 
      finalConfig.minValue, 
      finalConfig.maxValue
    );
    const otpDigits = otp.split("");

    // Save OTP to database
    await OTPSchema.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + duration * 60 * 1000),
    });

    // Generate and send email
    const emailContent = generateEmailTemplate({
      email,
      otpDigits,
      duration,
      config: finalConfig
    });

    await sendEmail(email, subject, emailContent);

    return { 
      success: true, 
      message: "OTP sent successfully!",
      expiresIn: duration * 60 // in seconds
    };

  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP.");
  }
};

module.exports = sendOTP;