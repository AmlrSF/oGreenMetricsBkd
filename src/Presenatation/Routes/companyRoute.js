const CompanyController = require('../Controllers/companyController');
const CompanyService = require('../../Application/Services/companyService');
const CompanyRepository = require('../../Infrastructure/Repositories/companyRepo');

async function userRoutes(fastify, options) {
   
  const companyRepository = new CompanyRepository();
  const companyService = new CompanyService(companyRepository);  
  const companyController = new CompanyController(companyService);

  
  fastify.get('/companies', (req, reply) => companyController.getCompanies(req, reply));
  fastify.post('/registercompany', (req, reply) => companyController.registercompany(req, reply));  
  fastify.put('/updatecompany/:id', (req, reply) => companyController.updatecompany(req, reply));  
  fastify.get('/company/:id', (req, reply) => companyController.getcompany(req, reply)); // 
  fastify.delete('/deletecompany/:id', (req, reply) => companyController.deletecompany(req, reply)); 
}

module.exports = userRoutes;
