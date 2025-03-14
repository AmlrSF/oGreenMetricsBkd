require("dotenv").config();
const Role = require("../../Domain/Entities/role"); // Ensure this path is correct

class RoleRepo {
  async getAllRoles() {
    const rolesData = await Role.find().lean(); // Fix here
    return rolesData;
  }

  async getRoleById(roleId) {
    const role = await Role.findById(roleId).lean(); // Fix here
    if (!role) {
      throw new Error("Role not found");
    }
    return role;
  }

  async createRole(roleData) {
    
    console.log(roleData);
    
    const newRole = new Role({
      name: roleData.name,
      description: roleData.description || "",
      userManagement: roleData.userManagement,
      roleManagement: roleData.roleManagement,
      companyManagement: roleData.companyManagement,
    });

    await newRole.save();
    return newRole;
  }

  async updateRole(roleId, updateData) {
    const updatedRole = await Role.findByIdAndUpdate(
      // Fix here
      roleId,
      { $set: updateData },
      { new: true }
    );
    if (!updatedRole) {
      throw new Error("Role not found");
    }
    return updatedRole;
  }

  async deleteRole(roleId) {
    const result = await Role.findByIdAndDelete(roleId); // Fix here
    if (!result) {
      throw new Error("Role not found");
    }
    return result;
  }
}

module.exports = RoleRepo;
