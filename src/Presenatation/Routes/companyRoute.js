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
  fastify.delete('/deletecompany/:id', (req, reply) => companyController.deleteCompany(req, reply)); 
  fastify.get("/GetCompanyByOwnerID/:ownerId", async (req, res) => {
    try {
      const ownerId = req.params.ownerId;
      const company = await Company.findOne({ ownerId });
      if (company) {
        res.status(200).json(company);
      } else {
        res.status(404).json({ message: "Company not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching company" });
    }
  });
  
}

module.exports = companyRoute;