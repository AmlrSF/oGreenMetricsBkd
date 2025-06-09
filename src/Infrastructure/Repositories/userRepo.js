const UserSchema = require("../../Domain/Entities/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const CompanySchema = require("../../Domain/Entities/company");

const Fuel = require("../../Domain/Entities/scope1/fuelcombution");
const Production = require("../../Domain/Entities/scope1/production");

const Heating = require("../../Domain/Entities/scope2/heating");
const Cooling = require("../../Domain/Entities/scope2/cooling");
const Energy = require("../../Domain/Entities/scope2/energyConsumption");

const Transport = require("../../Domain/Entities/scope3/Transport");
const Dechet = require("../../Domain/Entities/scope3/Dechets");
const CapitalGood = require("../../Domain/Entities/scope3/CapitalGoods");
const BusinessTravel = require("../../Domain/Entities/scope3/buisnessTravel");
const purchasedGoodAndService = require("../../Domain/Entities/scope3/PurchasedGoodsAndService");
const EmployesTransport = require("../../Domain/Entities/scope3/EmployesTransport");

const goal = require("../../Domain/Entities/goal");
const report = require("../../Domain/Entities/reporting/report");
const siteSchema = require("../../Domain/Entities/site/site");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { hashPassword, comparePassword } = require("../utils/hash");
const sendOTP = require("../utils/sendOTP");
const sendEmailInvitation = require("../utils/sendEmailInvitation");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const OTPSchema = require("../../Domain/Entities/OTP");
const fuelcombution = require("../../Domain/Entities/scope1/fuelcombution");

class UserRepo {
  async deleteUser(userId) {
    const company = await CompanySchema.findOne({ userId });
    const site = await siteSchema.find({ userId });
    if (company) {
      await Promise.all([
        Fuel.deleteMany({ companyId: company._id }),
        Production.deleteMany({ companyId: company._id }),

        Heating.deleteMany({ company_id: company._id }),
        Cooling.deleteMany({ company_id: company._id }),
        Energy.deleteMany({ company_id: company._id }),

        Transport.deleteMany({ company_id: company._id }),
        Dechet.deleteMany({ company_id: company._id }),
        CapitalGood.deleteMany({ company_id: company._id }),
        BusinessTravel.deleteMany({ company_id: company._id }),
        purchasedGoodAndService.deleteMany({ company_id: company._id }),
        EmployesTransport.deleteMany({ company_id: company._id }),

        goal.deleteMany({ company_id: company._id }),
        report.deleteMany({ company_id: company._id }),
      ]);

      await CompanySchema.deleteOne({ userId });
    }

    if (site) {
      siteSchema.deleteMany({ userId });
    }

    const result = await UserSchema.deleteOne({ _id: userId });

    return result;
  }

  async getAllUsers() {
    const usersData = await UserSchema.find().populate("AdminRoles").lean();
    return usersData;
  }

  async getUserById(id) {
    const userData = await UserSchema.findById(id)
      .populate("AdminRoles")
      .lean();
    return userData;
  }

  async getUserByEmail(email) {
    const userData = await UserSchema.findOne({ email });

    if (!userData) {
      throw new Error("User not found");
    }

    return userData;
  }

  async changePassword(userId, currentPassword, newPassword) {
    try {
      // Find the user
      const userDoc = await UserSchema.findById(userId);
      if (!userDoc) {
        throw new Error("User not found");
      }

      const isMatch = await comparePassword(
        currentPassword,
        userDoc.mot_de_passe
      );
      if (!isMatch) {
        throw new Error("Current password is incorrect");
      }

      const hashedPassword = await hashPassword(newPassword);
      userDoc.mot_de_passe = hashedPassword;
      await userDoc.save();

      return { message: "Password changed successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(id, updateData) {
    if (
      updateData.photo_de_profil &&
      updateData.photo_de_profil.trim() !== ""
    ) {
      const uploaded = await cloudinary.uploader.upload(
        updateData.photo_de_profil,
        {
          folder: "user_profiles",
        }
      );

      updateData.photo_de_profil = uploaded.secure_url;
    }

    console.log(updateData);

    const userData = await UserSchema.findById(id);

    if (updateData?.isVerified) {
      await sendVerificationEmail(userData, true);
    } else {
      await sendVerificationEmail(userData, false);
    }

    const userDoc = await UserSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    }).lean();

    return userDoc;
  }

  async registerUser(prenom, nom, email, mot_de_passe, role, AdminRoles) {
    return this.createUser(prenom, nom, email, mot_de_passe, role, AdminRoles);
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
      AdminRoles,
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

  async getUnverifiedUsers() {
    try {
      return await UserSchema.find({ 
        isVerified: false,
        role: { $ne: "Admin" } // Exclure les administrateurs
      }).select('_id prenom nom email isVerified').lean();
    } catch (error) {
      throw new Error(`Failed to fetch unverified users: ${error.message}`);
    }
  }

  async loginUser(email, mot_de_passe) {
    console.log(email, mot_de_passe);
    const userDoc = await UserSchema.findOne({ email }).populate("AdminRoles");
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

    return { user: userDoc, token };
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

    console.log(token == user.resetToke);
    if (user.resetToken !== token || user.resetTokenExpires < Date.now()) {
      throw new Error("Token invalide ou expiré");
    }

    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();
  }

  async sendEmailInvitation(user) {
    const Invitationdetails = {
      subject: "Invitaiton ",
      message: "You've Been Invited to Moderate!",
      user,
    };

    const createOTP = await sendEmailInvitation(Invitationdetails);
    return createOTP;
  }
}

module.exports = UserRepo;
