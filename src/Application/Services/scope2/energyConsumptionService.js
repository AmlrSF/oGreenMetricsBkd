const EnergyConsumptionRepo = require('../../../Infrastructure/Repositories/scope2/energyConsumptionRepo');
const CompanyRepo = require('../../../Infrastructure/Repositories/companyRepo'); // Add this
const emissionFactors = require("./Emissions.js");

class EnergyConsumptionService {
  constructor(energyConsumptionRepo, companyRepo) { // Add companyRepo
    this.energyConsumptionRepo = energyConsumptionRepo;
    this.companyRepo = companyRepo; // Add this
  }
  
  async getEmissionFactor(country, company_id) {
    try {
      // Try to get the emission factor from the company's record first
      const company = await this.companyRepo.getCompanyById(company_id);
      
      if (company && company.countryEmissionFactor) {
        return company.countryEmissionFactor;
      }
      
      // Fall back to the static emission factors if company doesn't have one
      return emissionFactors[country] || 0;
    } catch (error) {
       return emissionFactors[country] || 0;
    }
  }

  async calculateEmissions(yearlyConsumption, country, company_id) {
    const emissionFactor = await this.getEmissionFactor(country, company_id);
    return yearlyConsumption * emissionFactor;
  }

  async getEnergyConsumptionByCompanyId(company_id) {
    return await this.energyConsumptionRepo.getEnergyConsumptionByCompanyId(company_id);
  }

  async addEnergyConsumption(yearlyConsumption, country, company_id) {
    const emissions = await this.calculateEmissions(yearlyConsumption, country, company_id);
    const energyData = { yearlyConsumption, emissions, country, company_id };
    const existingData = await this.energyConsumptionRepo.getEnergyConsumptionByCompanyId(company_id);
    if (!existingData._id) {
      return await this.energyConsumptionRepo.createEnergyConsumption(energyData);
    } else {
      return await this.energyConsumptionRepo.updateEnergyConsumption(existingData._id, energyData);
    }
  }

  async updateEnergyConsumption(id, yearlyConsumption, country) {
    // Get the company_id from the existing record
    const existingRecord = await this.energyConsumptionRepo.findById(id);
    const company_id = existingRecord.company_id;
    
    const emissions = await this.calculateEmissions(yearlyConsumption, country, company_id);
    const energyData = { yearlyConsumption, emissions, country };
    return await this.energyConsumptionRepo.updateEnergyConsumption(id, energyData);
  }

  async deleteEnergyConsumption(id) {
    return await this.energyConsumptionRepo.deleteEnergyConsumption(id);
  }
}

module.exports = EnergyConsumptionService;