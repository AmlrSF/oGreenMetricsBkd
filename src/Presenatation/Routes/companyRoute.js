const companyController = require('../Controllers/companyController');
const companyService = require('../../Application/Services/companyService');
const companyRepo = require('../../Infrastructure/Repositories/companyRepo');

async function userRoutes(fastify, options) {
  
  // Initialize the repository, service, and controller
  const companyRepo = new companyRepo();
  const companyService = new companyService(companyRepo);
  const companyController = new companyController(companyService);

  // Define routes
  fastify.get('/companies', (req, reply) => companyController.getCompanies(req, reply));
  fastify.post('/registercompany', (req, reply) => companyController.registercompany(req, reply));
  fastify.put('/updatecompany/:id', (req, reply) => companyController.updatecompany(req, reply));
  fastify.get('/company/:id', (req, reply) => companyController.getcompany(req, reply));
  fastify.delete('/deletecompany/:id', (req, reply) => companyController.deletecompany(req, reply));
}

module.exports = userRoutes;
