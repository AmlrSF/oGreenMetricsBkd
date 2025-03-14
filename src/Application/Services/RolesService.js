class RoleService {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async getAllRoles() {
    return await this.roleRepository.getAllRoles();
  }

  async getRoleById(roleId) {
    return await this.roleRepository.getRoleById(roleId);
  }

  async createRole(roleData) {
    return await this.roleRepository.createRole(roleData);
  }

  async updateRole(roleId, updateData) {
    return await this.roleRepository.updateRole(roleId, updateData);
  }

  async deleteRole(roleId) {
    return await this.roleRepository.deleteRole(roleId);
  }
}

module.exports = RoleService;
