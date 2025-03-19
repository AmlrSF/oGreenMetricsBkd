const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mot_de_passe: { type: String, required: true },
    photo_de_profil: { type: String, default: "" },
    role: { type: String, enum: ["régulier", "entreprise", "Admin"] },
    AdminRoles: {  
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role", 
    },
    isVerified: { type: Boolean, default: false },
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Utilisateur", userSchema);

