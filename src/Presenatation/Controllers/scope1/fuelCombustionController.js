const fuelCombustionService = require('../../../Application/Services/scope1/fuelCombustionService');
const CompanyRepo = require('../../../Infrastructure/Repositories/companyRepo');

class FuelCombustionController {
  constructor() {
    this.companyRepo = new CompanyRepo();
  }

  async addFuelCombution(req, reply) {
    try {
      const data = req.body;
      const user = req.user;
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      const result = await fuelCombustionService.addFuelCombution(data, company._id);
      reply.code(201).send(result);
    } catch (error) {
      console.error('Error in addFuelCombution:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }

  async getFuelCombutions(req, reply) {
    try {
      const user = req.user;
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      const fuelCombutions = await fuelCombustionService.getFuelCombutions(company._id);
      reply.code(200).send(fuelCombutions);
    } catch (error) {
      console.error('Error in getFuelCombutions:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }

  async deleteFuelCombution(req, reply) {
    try {
      const { id } = req.params;
      const user = req.user;
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      const result = await fuelCombustionService.deleteFuelCombution(id, company._id);
      reply.code(200).send(result);
    } catch (error) {
      console.error('Error in deleteFuelCombution:', error.stack);
      reply.code(500).send({ error: error.message });
    }
  }

  async updateFuelCombution(req, reply) {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = req.user;
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      const result = await fuelCombustionService.updateFuelCombution(id, data, company._id);
      reply.code(200).send(result);
    } catch (error) {
      console.error('Error in updateFuelCombution:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }
}

module.exports = new FuelCombustionController();