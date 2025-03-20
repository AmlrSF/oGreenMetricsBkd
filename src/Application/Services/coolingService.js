// Services/coolingService.js
const CoolingRepo = require('../../Infrastructure/Repositories/coolingRepo');

class CoolingService {
  constructor(coolingRepo) {
    this.coolingRepo = coolingRepo;
  }

  async getEmissionFactor(type) {
    const factors = { "Electric Cooling": 0.06, "District Cooling": 0.094 };
    return factors[type] || 0;
  }

  async calculateEmissions(energy, type) {
    const emissionFactor = await this.getEmissionFactor(type);
    return energy * emissionFactor;
  }

  async getCooling() {
    return await this.coolingRepo.getCooling();
  }

  async addCooling(name, type, energy) {
    const emissionFactor = await this.getEmissionFactor(type);
    const emissions = await this.calculateEmissions(energy, type);
    const cooler = { name, type, energy, emissionFactor, emissions };

    const existingData = await this.coolingRepo.getCooling();
    if (!existingData._id) {
      const coolingData = {
        coolers: [cooler],
        totalEmissions: emissions,
      };
      return await this.coolingRepo.createCooling(coolingData);
    } else {
      const updatedData = {
        coolers: [...existingData.coolers, cooler],
        totalEmissions: existingData.totalEmissions + emissions,
      };
      return await this.coolingRepo.updateCooling(existingData._id, updatedData);
    }
  }
}

module.exports = CoolingService;