const CompanyRepo = require('../../Infrastructure/Repositories/companyRepo');
const CompanyService = require('../../Application/Services/companyService');
const CompanyController = require('../Controllers/companyController');

async function CompanyRoutes(fastify, options) {
  
  
  const companyRepo = new CompanyRepo();
  const companyService = new CompanyService(companyRepo);
  const companyController = new CompanyController(companyService);

  // Define routes
  fastify.get('/companies', (req, reply) => companyController.getCompanies(req, reply));
  fastify.post('/registercompany', (req, reply) => companyController.registercompany(req, reply));
  fastify.put('/updatecompany/:id', (req, reply) => companyController.updatecompany(req, reply));
  fastify.get('/company/:id', (req, reply) => companyController.getcompany(req, reply));
  fastify.delete('/deletecompany/:id', (req, reply) => companyController.deletecompany(req, reply));
}

module.exports = CompanyRoutes;
