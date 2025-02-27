const UserSchema = require("../../Domain/Entities/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const { hashPassword, comparePassword } = require("../utils/hash");

class UserRepo {
  async getAllUsers() {
    const usersData = await UserSchema.find().lean();
    return usersData;
  }

  async getUserById(id) {
    const userData = await UserSchema.findById(id).lean();
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

  async registerUser(prenom, nom, email, mot_de_passe,role) {
    return this.createUser(prenom, nom, email, mot_de_passe,role);
  }

  async createUser(prenom, nom, email, mot_de_passe,role) {
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
    });
    return userDoc.toObject();
  }



  async loginUser(email, mot_de_passe) {
    const userDoc = await UserSchema.findOne({ email });
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
    return { user: userDoc.toObject(), token };
  }
}

module.exports = UserRepo;
