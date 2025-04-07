require("dotenv").config();

class ShowDataService {
  constructor(showDataRepo) {
    this.showDataRepo = showDataRepo;
  }

  async getFullDataByCompany(company_id) {
    const data = await this.showDataRepo.generateDataByCompanyId(company_id);
    return data;
  }
}

module.exports = ShowDataService;
