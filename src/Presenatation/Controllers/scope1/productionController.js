const productionService = require('../../../Application/Services/scope1/productionService');
const CompanyRepo = require('../../../Infrastructure/Repositories/companyRepo');

class ProductionController {
  constructor() {
    this.companyRepo = new CompanyRepo();
  }

  async addProduction(req, reply) {
    try {
      const data = req.body;
      const user = req.user;
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      const result = await productionService.addProduction(data, company._id);
      reply.code(201).send(result);
    } catch (error) {
      console.error('Error in addProduction:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }

  async getProductions(req, reply) {
    try {
      const user = req.user;
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      const productions = await productionService.getProductions(company._id);
      reply.code(200).send(productions);
    } catch (error) {
      console.error('Error in getProductions:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }

  async deleteProduction(req, reply) {
    try {
      const { id } = req.params;
      const user = req.user;
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      const result = await productionService.deleteProduction(id, company._id);
      reply.code(200).send(result);
    } catch (error) {
      console.error('Error in deleteProduction:', error.stack);
      reply.code(500).send({ error: error.message });
    }
  }

  async updateProduction(req, reply) {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = req.user;
      const company = await this.companyRepo.getCompanyByOwnerId(user._id);
      if (!company) {
        return reply.code(401).send({ error: "User not associated with a company" });
      }
      const result = await productionService.updateProduction(id, data, company._id);
      reply.code(200).send(result);
    } catch (error) {
      console.error('Error in updateProduction:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }
}

module.exports = new ProductionController();