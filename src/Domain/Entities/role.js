const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  
  description: { type: String, default: "" },
  userManagement: { type: String, default: "00" },
  roleManagement: { type: String, default: "00" },
  companyManagement: { type: String, default: "00" }
}); 

const Role = mongoose.model("Role", roleSchema);

module.exports = Role
