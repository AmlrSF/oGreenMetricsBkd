const sendEmail = require("./sendEmail");

const sendEmailInvitation = async ({ user, subject, message }) => {
  try {
    if (!user || !user.email || !user.prenom || !user.nom || !user.mot_de_passe) {
      throw new Error("Missing user details");
    }

    const { email, prenom, nom, mot_de_passe } = user;
   
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Invitation to Moderate</title>
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
          .logo {
            max-width: 120px;
            margin-bottom: 20px;
          }
          .header {
            font-size: 20px;
            font-weight: bold;
            color: #2d8f2d;
          }
          .content {
            font-size: 16px;
            color: #333;
            margin-top: 10px;
          }
          .credentials {
            background: #e0f2e0;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: left;
            font-size: 18px;
            position: relative;
          }
          .blurred {
            filter: blur(5px);
            user-select: none;
          }
          .show-button {
            background-color: #2d8f2d;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
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
          <div class="header">You've Been Invited to Moderate!</div>
          
          <div class="content">
            Hello <strong>${prenom} ${nom}</strong>,  
            <br> ${message}.
            <br> Below are your login credentials:
          </div>

          <div class="credentials">
            <p><strong>Email:</strong> <span id="email" class="blurred">${email}</span></p>
            <p><strong>Password:</strong> <span id="password" class="blurred">${mot_de_passe}</span></p>
          </div>

          <p class="content">
            Click the button below to start moderating.
          </p>
          
          <a href="http://localhost:3000/Dashboard/Admin" style="text-decoration: none; cursor:pointer;">
            <button class="show-button">Go to Dashboard</button>
          </a>

          <p class="footer">
            If you did not request this invitation, please ignore this email.
          </p>
        </div>

        <script>
          function unblur() {
            document.getElementById("email").classList.remove("blurred");
            document.getElementById("password").classList.remove("blurred");
          }
        </script>

      </body>
      </html>
    `;

    await sendEmail(email, subject, emailContent);

    return { success: true, message: "Invitation sent successfully!" };
  } catch (error) {
    console.error("Error sending invitation:", error);
    throw new Error("Failed to send invitation.");
  }
};

module.exports = sendEmailInvitation;
