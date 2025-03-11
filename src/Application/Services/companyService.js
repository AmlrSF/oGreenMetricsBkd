class CompanyService {
  constructor(companyRepository) {
    this.companyRepository = companyRepository; // Use the repository instance
  }

  // Get all companies
  async getAllCompanies() {
    return await this.companyRepository.getAllCompanies();
  }
 
 // Create a new company
async createCompany(nom_entreprise, matricule_fiscale, email, num_tel, adresse, date_fondation, industrie, userId) {
  console.log({ nom_entreprise, matricule_fiscale, email, num_tel, adresse, date_fondation, industrie, userId }); // Log company data
  const companyData = { 
    nom_entreprise, 
    matricule_fiscale, 
    email, 
    num_tel, 
    adresse, 
    date_fondation, 
    industrie,
    userId 
  };
  return await this.companyRepository.createCompany(companyData);
}
  

  // Get company by ID
  async getCompanyById(id) {
    return await this.companyRepository.getCompanyById(id);
  }

  // Update a company
  async updateCompany(id, updateData) {
    return await this.companyRepository.updateCompany(id, updateData);
  }

  // Delete a company
  async deleteCompany(id) {
    return await this.companyRepository.deleteCompany(id);
  }
}

module.exports = CompanyService;
