const sendEmail = require("./sendEmail");

const sendEmailVerificationStatus = async ( user, isVerified ) => {
  
  try {
    if (!user || !user.email || !user.prenom || !user.nom) {
      throw new Error("Missing user details");
    }

    const { email, prenom, nom } = user;



    const statusMessage = isVerified
      ? `Your account has been <strong style="color: green;">verified</strong> and approved! You can now log in using your credentials.`
      : `Your account has been <strong style="color: red;">dismissed</strong> at this time. Please wait for further approval or contact support if needed.`;


      console.log(isVerified,statusMessage);
    const actionButton = isVerified
      ? `
      <a href="http://localhost:3000/login" style="text-decoration: none;">
        <button class="action-button">Log In</button>
      </a>
      `
      : "";

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Account Verification Status</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
          }
          .container {
            max-width: 500px;
            background: white;
            padding: 20px;
            margin: 20px auto;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            font-size: 22px;
            font-weight: bold;
            color: ${isVerified ? "#2d8f2d" : "#c0392b"};
            margin-bottom: 15px;
          }
          .content {
            font-size: 16px;
            color: #333;
            margin-top: 10px;
          }
          .action-button {
            background-color: #2d8f2d;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
          }
          .footer {
            font-size: 12px;
            color: gray;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>

        <div class="container">
          <div class="header">Account Verification Update</div>

          <div class="content">
            Hello <strong>${prenom} ${nom}</strong>,<br><br>
            ${statusMessage}
          </div>

          ${actionButton}

          <p class="footer">
            If you believe this was a mistake or have any questions, please contact support.
          </p>
        </div>

      </body>
      </html>
    `;

    const subject = "Your Account Verification Status";
    await sendEmail(email, subject, emailContent);

    return { success: true, message: "Verification status email sent." };
  } catch (error) {
    console.error("Error sending verification status email:", error);
    throw new Error("Failed to send verification status email.");
  }
};

module.exports = sendEmailVerificationStatus;
