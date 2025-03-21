const CompanyRepo = require('../../Infrastructure/Repositories/companyRepo'); 
const CompanyService = require('../../Application/Services/companyService');
const CompanyController = require('../Controllers/companyController');

async function companyRoute(fastify, options) {
  const companyRepo = new CompanyRepo();  
  const companyService = new CompanyService(companyRepo);
  const companyController = new CompanyController(companyService);

  fastify.get('/companies', (req, reply) => companyController.getCompanies(req, reply));
  fastify.post('/registercompany', (req, reply) => companyController.registerCompany(req, reply));  
  fastify.put('/updatecompany/:id', (req, reply) => companyController.updatecompany(req, reply));  
  fastify.get('/company/:id', (req, reply) => companyController.getCompany(req, reply));
  fastify.get('/GetCompanyByOwnerID/:id', (req, reply) => companyController.GetCompanyByOwnerID(req, reply));
  fastify.delete('/deletecompany/:id', (req, reply) => companyController.deleteCompany(req, reply)); 
}

module.exports = companyRoute;