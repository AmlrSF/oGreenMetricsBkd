const EnergyConsumptionRepo = require('../../../Infrastructure/Repositories/scope2/energyConsumptionRepo');
const emissionFactors = require("./Emissions.js");

class EnergyConsumptionService {
  constructor(energyConsumptionRepo) {
    this.energyConsumptionRepo = energyConsumptionRepo;
  }
  
  async getEmissionFactor(country) {
    return emissionFactors[country] || 0;
  }

  async calculateEmissions(yearlyConsumption, country) {
    const emissionFactor = await this.getEmissionFactor(country);
    return yearlyConsumption * emissionFactor;
  }

  async getEnergyConsumptionByCompanyId(company_id) { // Updated method
    return await this.energyConsumptionRepo.getEnergyConsumptionByCompanyId(company_id);
  }

  async addEnergyConsumption(yearlyConsumption, country, company_id) { // Added company_id
    const emissions = await this.calculateEmissions(yearlyConsumption, country);
    const energyData = { yearlyConsumption, emissions, country, company_id };
    const existingData = await this.energyConsumptionRepo.getEnergyConsumptionByCompanyId(company_id);
    if (!existingData._id) {
      return await this.energyConsumptionRepo.createEnergyConsumption(energyData);
    } else {
      return await this.energyConsumptionRepo.updateEnergyConsumption(existingData._id, energyData);
    }
  }

  async updateEnergyConsumption(id, yearlyConsumption, country) {
    const emissions = await this.calculateEmissions(yearlyConsumption, country);
    const energyData = { yearlyConsumption, emissions, country };
    return await this.energyConsumptionRepo.updateEnergyConsumption(id, energyData);
  }

  async deleteEnergyConsumption(id) {
    return await this.energyConsumptionRepo.deleteEnergyConsumption(id);
  }
}

module.exports = EnergyConsumptionService;