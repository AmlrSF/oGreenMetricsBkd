const fuelService = require('../../Application/Services/fuelService');
const CompanyRepo = require('../../Infrastructure/Repositories/companyRepo');

class FuelController {
  constructor() {
    this.companyRepo = new CompanyRepo();
  }

  async addFuelCombution(req, reply) {
    try {
      console.log('Inside addFuelCombution:', req.body);
      const data = req.body;
      const user = req.user;
      
      // Get the company for this user instead of relying on companyId in user model
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      
      const result = await fuelService.addFuelCombution(data, company._id);
      reply.code(201).send(result);
    } catch (error) {
      console.error('Error in addFuelCombution:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }

  async getFuelCombutions(req, reply) {
    try {
      console.log('Inside getFuelCombutions');
      const user = req.user;
      
      // Get the company for this user
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      
      const fuelCombutions = await fuelService.getFuelCombutions(company._id);
      reply.code(200).send(fuelCombutions);
    } catch (error) {
      console.error('Error in getFuelCombutions:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }

  async addProduction(req, reply) {
    try {
      console.log('Inside addProduction:', req.body);
      const data = req.body;
      const user = req.user;
      
      // Get the company for this user
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      
      const result = await fuelService.addProduction(data, company._id);
      reply.code(201).send(result);
    } catch (error) {
      console.error('Error in addProduction:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }

  async getProductions(req, reply) {
    try {
      console.log('Inside getProductions');
      const user = req.user;
      
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      
      const productions = await fuelService.getProductions(company._id);
      reply.code(200).send(productions);
    } catch (error) {
      console.error('Error in getProductions:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }
}

module.exports = new FuelController();