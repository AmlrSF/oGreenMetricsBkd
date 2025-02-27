const UserController = require('../Controllers/userController');
const UserService = require('../../Application/Services/userService');
const UserRepository = require('../../Infrastructure/Repositories/userRepo');

async function userRoutes(fastify, options) {
  
  // Initialize the repository, service, and controller
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  // Define routes
  fastify.get('/users', (req, reply) => userController.getUsers(req, reply));
  fastify.post('/register', (req, reply) => userController.register(req, reply));
  fastify.post('/login', (req, reply) => userController.login(req, reply));
  fastify.put('/users/:id', (req, reply) => userController.update(req, reply));
  fastify.get('/users/:id', (req, reply) => userController.getUser(req, reply));
  fastify.delete('/users/:id', (req, reply) => userController.delete(req, reply));
}

module.exports = userRoutes;
