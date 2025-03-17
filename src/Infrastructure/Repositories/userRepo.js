const UserSchema = require("../../Domain/Entities/user");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

require("dotenv").config();

const { hashPassword, comparePassword } = require("../utils/hash");
const sendOTP = require("../utils/sendOTP");
const sendEmailInvitation = require('../utils/sendEmailInvitation');
const OTPSchema = require("../../Domain/Entities/OTP");

class UserRepo {
  
  async getAllUsers() {
    const usersData = await UserSchema.find().populate('AdminRoles').lean();
    return usersData;
  }

  async getUserById(id) {
    const userData = await UserSchema.findById(id).populate('AdminRoles').lean();
    return userData;
  }

  async getUserByEmail(email) {
    const userData = await UserSchema.findOne({ email });
  
    if (!userData) {
      throw new Error("User not found");
    }
  
    return userData;
  }
  

  async updateUser(id, updateData) {
    const userDoc = await UserSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    }).lean();
    return userDoc;
  }

  async deleteUser(id) {
    const result = await UserSchema.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async registerUser(prenom, nom, email, mot_de_passe, role,AdminRoles) {
    return this.createUser(prenom, nom, email, mot_de_passe, role,AdminRoles);
  }

  async createUser(prenom, nom, email, mot_de_passe, role, AdminRoles) {
    const user = await UserSchema.findOne({ email });
    if (user) {
      throw new Error("Email already used");
    }

    const hashedPassword = await hashPassword(mot_de_passe);
    console.log(hashPassword);

    const userDoc = await UserSchema.create({
      prenom,
      nom,
      email,
      mot_de_passe: hashedPassword,
      role,
      AdminRoles
    });
    return userDoc.toObject();
  }

  async resetPassword(email, newPass) {
    try {
      const hashedPassword = await hashPassword(newPass);

      console.log("Resetting password for:", email);

     
      const updatedUser = await UserSchema.findOneAndUpdate(
        { email: email }, 
        { mot_de_passe: hashedPassword },
        { new: true } 
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return { message: "Password updated successfully" };
    } catch (error) {
      throw new Error(`Error updating password: ${error.message}`);
    }
  }

  async loginUser(email, mot_de_passe) {
    const userDoc = await UserSchema.findOne({ email }).populate('AdminRoles');
    if (!userDoc) {
      throw new Error("User not found");
    }

    const isMatch = await comparePassword(mot_de_passe, userDoc.mot_de_passe);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: userDoc._id.toString(), email: userDoc.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user: userDoc, token  };
  }

  async sendPasswordResetOtpEmail(email) {
    const userDoc = await UserSchema.findOne({ email });
    if (!userDoc) {
      throw new Error("User not found");
    }

    const optdetails = {
      email,
      subject: "Password Reset",
      message: "Enter the code below to reset your password",
      duration: 1,
    };

    const createOTP = await sendOTP(optdetails);
    return createOTP;
  }

  async findOTPByEmail(email) {
    const otp = await OTPSchema.findOne({ email }).sort({ expiresAt: -1 });
    console.log(otp);
    return otp;
  }

  async deleteOTPByEmail(email) {
    return await OTPSchema.deleteOne({ email });
  }

  async createResetToken(email) {
    const user = await this.getUserByEmail(email);
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    return resetToken;
  }

  async verifyAndDeleteResetToken(email, token) {
    const user = await this.getUserByEmail(email);

    console.log(token == user.resetToke)
    if (user.resetToken !== token || user.resetTokenExpires < Date.now()) {
       throw new Error("Token invalide ou expiré");
    }

    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();
  }

  async sendEmailInvitation(user) {

    const Invitationdetails  = {
      subject: "Invitaiton ",
      message : "You've Been Invited to Moderate!",
      user
    };

    const createOTP = await sendEmailInvitation(Invitationdetails);
    return createOTP;
    
  }
}

module.exports = UserRepo;
