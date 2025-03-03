require("dotenv").config();
const jwt = require("jsonwebtoken");

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // Get all users
  async getUsers(req, reply) {
    try {
      const users = await this.userService.getAllUsers();
      reply.send(users);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  // Get single user
  async getUser(req, reply) {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById(id);
      reply.send(user);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  // Update user details
  async update(req, reply) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      console.log(id, updateData);
      
      const user = await this.userService.updateUser(id, updateData);
      reply.send(user);
    } catch (error) {
      reply.code(400).send({ error: error.message });
    }
  }

  // Delete a user by id
  async delete(req, reply) {
    try {
      const { id } = req.params;
      const success = await this.userService.deleteUser(id);
      reply.send({ success });
    } catch (error) {
      reply.code(400).send({ error: error.message });
    }
  }

  // Register a new user and return a JWT token
  async register(req, reply) {
    try {
      const { prenom, nom, email, mot_de_passe, role } = req.body;
      const user = await this.userService.registerUser(
        prenom,
        nom,
        email,
        mot_de_passe,
        role
      );

      reply.code(201).send({ user });
    } catch (error) {
      reply.code(400).send({ error: error.message });
    }
  }

  // Log in a user and return a JWT token
  async login(req, reply) {
    try {
      const { email, mot_de_passe } = req.body;
      const { user, token } = await this.userService.loginUser(
        email,
        mot_de_passe
      );

      reply.setCookie("auth_token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Strict", 
        path: "/", 
        maxAge: 3600, 
      });
      console.log(user)
      reply.code(200).send({ user });
    } catch (error) {
      reply.code(200).send({ error: error.message });
    }
  }

  async authorize(req, reply) {
    try {
      const token = req.cookies["auth_token"];

      console.log(token);

      if (!token) {
        return reply.status(401).send({ message: "Unauthorized" });
      }

      const secret = process.env.JWT_SECRET || "";

      const decoded = jwt.verify(token, secret);

      const user = await this.userService.getUserById(decoded.id);
      console.log(user)

      return reply.status(200).send({ user: user });
    } catch (error) {
      return reply.code(200).send({ error: error.message });
    }
  }

  async sendPasswordResetOtpEmail(req, reply) {
    const { email } = req.body;
    console.log(email);

    try {
      const CreatedpasswordResetOTP = await this.userService.sendOTP(email);
      console.log(CreatedpasswordResetOTP);

     

      reply.status(200).send({ CreatedpasswordResetOTP });
    } catch (error) {
      console.error("Error in sendPasswordResetOtpEmail:", error);
      reply.status(400).send({ message: error.message }); // Now returns the correct message!
    }
  }

  async verifyOTP(req, reply) {
    const { email, otp } = req.body;
    try {
      const otpRecord = await this.userService.findOTPByEmail(email);
      console.log(otpRecord);

      if (!otpRecord) {
        return reply.send({
          success: false,
          message: "OTP not found or expired",
        });
      }

      console.log(otp , otpRecord.otp)
      if (otp !== otpRecord.otp) {
        return reply.send({ success: false, message: "Invalid OTP" });
      }

      if (otpRecord.expiresAt < Date.now()) {
        await this.userService.deleteOTPByEmail(email); // Delete expired OTP
        return reply.send({ success: false, message: "OTP has expired" });
      }

      await this.userService.deleteOTPByEmail(email);

      const token = await this.userService.createResetToken(email);

      return reply.send({
        success: true,
        message: "OTP verified successfully",
        token,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return reply
        .code(400)
        .send({ success: false, message: "OTP verification failed" });
    }
  }

  async resetPassword(req, reply, token) {
    const { email, newPass } = req.body;

    try {
      await this.userService.verifyAndDeleteResetToken(email,token);

      const resetPass = await this.userService.resetPassword(email, newPass);

      reply.status(200).send({ message: resetPass.message });
    } catch (error) {
      reply.status(400).send({ message: error.message });
    }
  }

  

}

module.exports = UserController;
