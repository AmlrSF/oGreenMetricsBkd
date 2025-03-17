// src/Application/Services/companyService.js

class CompanyService {
  constructor(companyRepo) {
      this.companyRepo = companyRepo;
  }

  async getAllCompanies() {
      return await this.companyRepo.getAllCompanies();
  }

  async createCompany(nom_entreprise, matricule_fiscale, email, num_tel, adresse, date_fondation, industrie, userId) {
      console.log({ nom_entreprise, matricule_fiscale, email, num_tel, adresse, date_fondation, industrie, userId });
      const emissionFactor = await this.getEmissionFactor(industrie);
      const emissions = emissionFactor ;   
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
      return await this.companyRepo.createCompany(companyData);
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
   };
  return factors[industrie] || 1;
}
}

module.exports = CompanyService;