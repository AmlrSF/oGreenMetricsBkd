const EnergyConsumptionRepo = require('../../../Infrastructure/Repositories/scope2/energyConsumptionRepo');

class EnergyConsumptionService {
  constructor(energyConsumptionRepo) {
    this.energyConsumptionRepo = energyConsumptionRepo;
  }

  async getEmissionFactor(country) {
    const factors = {
      Sweden: 0.013,
      Lithuania: 0.018,
      France: 0.059,
      Austria: 0.085,
      Latvia: 0.105,
      Finland: 0.113,
      Slovakia: 0.132,
      Denmark: 0.166,
      Belgium: 0.17,
      Croatia: 0.21,
      Luxembourg: 0.219,
      Slovenia: 0.254,
      Italy: 0.256,
      Hungary: 0.26,
      Spain: 0.256,
      "United Kingdom": 0.281,
      Romania: 0.306,
      Portugal: 0.325,
      Ireland: 0.425,
      Germany: 0.441,
      Bulgaria: 0.47,
      Netherlands: 0.505,
      Czechia: 0.513,
      Greece: 0.623,
      Malta: 0.648,
      Cyprus: 0.677,
      Poland: 0.773,
      Estonia: 0.819,
    };
    return factors[country] || 0;
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