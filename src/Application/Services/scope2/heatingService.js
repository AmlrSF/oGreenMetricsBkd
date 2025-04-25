const HeatingRepo = require('../../../Infrastructure/Repositories/scope2/heatingRepo');

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

  async getHeatingByCompanyId(company_id) { // Updated method
    return await this.heatingRepo.getHeatingByCompanyId(company_id);
  }

  async addHeating(name, type, energy, company_id) { // Added company_id
    const emissionFactor = await this.getEmissionFactor(type);
    const emissions = await this.calculateEmissions(energy, type);
    const heater = { name, type, energy, emissionFactor, emissions };
    const existingData = await this.heatingRepo.getHeatingByCompanyId(company_id);
    if (!existingData._id) {
      const heatingData = { heaters: [heater], totalEmissions: emissions, company_id };
      return await this.heatingRepo.createHeating(heatingData);
    } else {
      const updatedData = {
        heaters: [...existingData.heaters, heater],
        totalEmissions: existingData.totalEmissions + emissions,
      };
      return await this.heatingRepo.updateHeating(existingData._id, updatedData);
    }
  }

  async updateHeater(recordId, heaterId, name, type, energy) {
    // Directly find the record by its _id, not by company_id
    const existingData = await this.heatingRepo.findById(recordId);
    
    if (!existingData) throw new Error('Heating record not found');
    
    // Find the heater by ID
    const heaterIndex = existingData.heaters.findIndex(heater => 
      heater._id.toString() === heaterId
    );
    
    if (heaterIndex === -1) throw new Error('Heater not found');
    
    // Calculate new emissions
    const oldEmissions = existingData.heaters[heaterIndex].emissions;
    const emissionFactor = await this.getEmissionFactor(type);
    const emissions = await this.calculateEmissions(energy, type);
    
    // Update the heater
    existingData.heaters[heaterIndex] = { 
      ...existingData.heaters[heaterIndex],  // Keep the original _id and any other fields
      name, 
      type, 
      energy, 
      emissionFactor, 
      emissions 
    };
    
    // Update total emissions
    existingData.totalEmissions = existingData.totalEmissions - oldEmissions + emissions;
    
    // Save the updated record
    return await this.heatingRepo.updateHeating(recordId, existingData);
  }
  async deleteHeater(recordId, heaterId) {
    return await this.heatingRepo.deleteHeater(recordId, heaterId);
  }
}

module.exports = HeatingService;