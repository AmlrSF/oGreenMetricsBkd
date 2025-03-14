class RoleController {
  constructor(roleService) {
    this.roleService = roleService;
  }

  async getRoles(req, reply) {
    try {
      const roles = await this.roleService.getAllRoles();
      reply.send({ success: true, data: roles });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async registerRole(req, reply) {
   
    try {
      const result = await this.roleService.createRole(req.body);
      
      reply.send({ success: true, data: result });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async updateRole(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedRole = await this.roleService.updateRole(id, updateData);
      reply.send({ success: true, data: updatedRole });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async getRole(req, reply) {
    const { id } = req.params;
    try {
      const role = await this.roleService.getRoleById(id);
      reply.send({ success: true, data: role });
    } catch (error) {
      reply.status(404).send({ success: false, message: error.message });
    }
  }

  async deleteRole(req, reply) {
    const { id } = req.params;
    try {
      const isDeleted = await this.roleService.deleteRole(id);
      if (isDeleted) {
        reply.send({ success: true, message: "Role deleted successfully" });
      } else {
        reply.status(404).send({ success: false, message: "Role not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = RoleController;
