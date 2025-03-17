const RoleController = require('../Controllers/RoleController');
const RoleService = require('../../Application/Services/RolesService');
const RoleRepository = require('../../Infrastructure/Repositories/rolesRepo');

async function roleRoutes(fastify, options) {
  
  const roleRepository = new RoleRepository();
  const roleService = new RoleService(roleRepository);
  const roleController = new RoleController(roleService);
  
  fastify.get('/roles', (req, reply) => roleController.getRoles(req, reply));
  fastify.post('/roles', (req, reply) => roleController.registerRole(req, reply));
  fastify.get('/roles/:id', (req, reply) => roleController.getRole(req, reply));
  fastify.put('/roles/:id', (req, reply) => roleController.updateRole(req, reply));
  fastify.delete('/roles/:id', (req, reply) => roleController.deleteRole(req, reply));

}

module.exports = roleRoutes;
