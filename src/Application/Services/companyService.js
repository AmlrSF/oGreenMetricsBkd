class CompanyService {
    constructor(CompanyRepository) {
      this.CompanyRepository = CompanyRepository;
    }
  
    async getAllCompany() {
      return await this.companyRepo.getAllCompany();
    }
  
    async registerCompany(nom_entreprise, matricule_fiscale, email, num_tel,adresse,date_fondation,industrie) {
      return await this.companyRepo.registerCompany(nom_entreprise, matricule_fiscale, email, num_tel,adresse,date_fondation,industrie);
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
  }
 
  
module.exports = CompanyService;
  