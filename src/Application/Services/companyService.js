const ProductionRepository = require('../../Infrastructure/Repositories/productionRepo');

class CompanyService {
  constructor(companyRepo) {
    this.companyRepo = companyRepo;
  }

  async getAllCompanies(userId) {
    return await this.companyRepo.getAllCompanies(userId);
  }
 
  async getCompanyByOwnerId(userId) {
    return await this.companyRepo.getCompanyByOwnerId(userId);
  }

  async createCompany(nom_entreprise, matricule_fiscale, email, num_tel, adresse, date_fondation, industrie, userId) {
    console.log({ nom_entreprise, matricule_fiscale, email, num_tel, adresse, date_fondation, industrie, userId });

    // Get emission factor based on industry
    const emissionFactor = await this.getEmissionFactor(industrie);
    const emissions = emissionFactor;   

    // Create company
    const companyData = { 
        nom_entreprise, 
        matricule_fiscale, 
        email, 
        num_tel, 
        adresse, 
        date_fondation, 
        industrie,
        emissions, 
        userId 
    };
    const newCompany = await this.companyRepo.createCompany(companyData);

    // Create production entry with emission factor
    const productionData = {
        products: [],
        totalEmissions: 0,
        emissionFactor: emissionFactor,
        companyId: newCompany._id
    };
    await ProductionRepository.create(productionData);
    
    // Remove the user update since we removed the bidirectional relationship
    
    return newCompany;
  }

  async getCompanyById(id) {
    return await this.companyRepo.getCompanyById(id);
  }

  async updateCompany(id, updateData) {
    return await this.companyRepo.updateCompany(id, updateData);
  }

  async deleteCompany(id) {
    return await this.companyRepo.deleteCompany(id);
  }

  async setEmissions(companyId, emissions) {
    await this.companyRepo.updateEmissions(companyId, emissions);
  }

  async calculateEmissions(companyId) {
    const company = await this.companyRepo.getCompanyById(companyId);
    const emissionFactor = await this.getEmissionFactor(company.industrie);
    return company.emissions * emissionFactor;
  }

  async getEmissionFactor(industrie) {
    const factors = {
      "Cement production": 0.43971,
      "Lime production": 0.86,
      // Add other industries here
    };
    return factors[industrie] || 1;
  }
}

module.exports = CompanyService;
