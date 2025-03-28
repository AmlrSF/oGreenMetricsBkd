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

  async getCoolingByCompanyId(company_id) { // Updated method
    return await this.coolingRepo.getCoolingByCompanyId(company_id);
  }

  async addCooling(name, type, energy, company_id) { // Added company_id
    const emissionFactor = await this.getEmissionFactor(type);
    const emissions = await this.calculateEmissions(energy, type);
    const cooler = { name, type, energy, emissionFactor, emissions };
    const existingData = await this.coolingRepo.getCoolingByCompanyId(company_id);
    if (!existingData._id) {
      const coolingData = { coolers: [cooler], totalEmissions: emissions, company_id };
      return await this.coolingRepo.createCooling(coolingData);
    } else {
      const updatedData = {
        coolers: [...existingData.coolers, cooler],
        totalEmissions: existingData.totalEmissions + emissions,
      };
      return await this.coolingRepo.updateCooling(existingData._id, updatedData);
    }
  }

  async updateCooler(recordId, coolerId, name, type, energy) {
    const existingData = await this.coolingRepo.getCoolingById(recordId);
    if (!existingData._id || existingData._id.toString() !== recordId) throw new Error('Cooling record not found');
    const coolerIndex = existingData.coolers.findIndex(cooler => cooler._id.toString() === coolerId);
    if (coolerIndex === -1) throw new Error('Cooler not found');
    const oldEmissions = existingData.coolers[coolerIndex].emissions;
    const emissionFactor = await this.getEmissionFactor(type);
    const emissions = await this.calculateEmissions(energy, type);
    existingData.coolers[coolerIndex] = { _id: coolerId, name, type, energy, emissionFactor, emissions };
    existingData.totalEmissions = existingData.totalEmissions - oldEmissions + emissions;
    return await this.coolingRepo.updateCooling(recordId, existingData);
}

  async deleteCooler(recordId, coolerId) {
    return await this.coolingRepo.deleteCooler(recordId, coolerId);
  }
}

module.exports = CoolingService;