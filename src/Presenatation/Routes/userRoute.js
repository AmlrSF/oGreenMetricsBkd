const UserController = require('../Controllers/userController');
const UserService = require('../../Application/Services/userService');
const UserRepository = require('../../Infrastructure/Repositories/userRepo');

async function userRoutes(fastify, options) {
  
  
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  
  fastify.get('/users', (req, reply) => userController.getUsers(req, reply));
  fastify.post('/register', (req, reply) => userController.register(req, reply));
  fastify.post('/forgetPassword', (req, reply) => userController.sendPasswordResetOtpEmail(req, reply));
  fastify.post('/login', (req, reply) => userController.login(req, reply));
  fastify.post('/verifyOTP', (req, reply) => userController.verifyOTP(req, reply));
  fastify.post('/auth', (req, reply) => userController.authorize(req, reply));
  fastify.put('/users/:id', (req, reply) => userController.update(req, reply));
  fastify.get('/users/:id', (req, reply) => userController.getUser(req, reply));
  fastify.delete('/users/:id', (req, reply) => userController.delete(req, reply));
  fastify.post('/users/logout', (req, reply) => userController.logout(req, reply));
  fastify.post('/InviteUser', (req, reply) => userController.InviteUser(req, reply));
  fastify.put('/resetPassword', (req, reply) => {
    const resetToken = req.query.resetToken; 
    userController.resetPassword(req, reply, resetToken);
  });
}

module.exports = userRoutes;