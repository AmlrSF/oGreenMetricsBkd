// Services/heatingService.js
const HeatingRepo = require('../../Infrastructure/Repositories/heatingRepo');

class HeatingService {
  constructor(heatingRepo) {
    this.heatingRepo = heatingRepo;
  }

  async getEmissionFactor(type) {
    const factors = { "Electric Heating": 0.376, "District Heating": 0.232 };
    return factors[type] || 0;
  }

  async calculateEmissions(energy, type) {
    const emissionFactor = await this.getEmissionFactor(type);
    return energy * emissionFactor;
  }

  async getHeating() {
    return await this.heatingRepo.getHeating();
  }

  async addHeating(name, type, energy) {
    const emissionFactor = await this.getEmissionFactor(type);
    const emissions = await this.calculateEmissions(energy, type);
    const heater = { name, type, energy, emissionFactor, emissions };

    const existingData = await this.heatingRepo.getHeating();
    if (!existingData._id) {
      const heatingData = {
        heaters: [heater],
        totalEmissions: emissions,
      };
      return await this.heatingRepo.createHeating(heatingData);
    } else {
      const updatedData = {
        heaters: [...existingData.heaters, heater],
        totalEmissions: existingData.totalEmissions + emissions,
      };
      return await this.heatingRepo.updateHeating(existingData._id, updatedData);
    }
  }
}

module.exports = HeatingService;