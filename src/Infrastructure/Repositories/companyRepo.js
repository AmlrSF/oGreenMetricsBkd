const CompanySchema = require("../../Domain/Entities/company");


class CompanyRepo {
  async getAllCompanies() {
    const companiesData = await CompanySchema.find({})
      .populate("userId")
      .lean();
    return companiesData;
  }

  async getUnverifiedCompanies() {
    try {
      return await CompanySchema.find({ 
        isVerified: false 
      }).select('_id nom_entreprise isVerified').lean();
    } catch (error) {
      throw new Error(`Failed to fetch unverified companies: ${error.message}`);
    }
  }
  

  async getCompanyById(companyId) {
    const company = await CompanySchema.findById(companyId)
      .populate("userId")
      .lean();
    if (!company) {
      throw new Error("Company not found");
    }
    return company;
  }

  async getCompanyByOwnerId(userId) {
    //console.log(userId);
    
    const company = await CompanySchema.findOne({ userId })
      .populate("userId")
      .lean();

      //console.log(company);
      
    if (!company) {
      throw new Error("Company not found for this user");
    }
    return company;
  }
  async createCompany(companyData) {
    const newCompany = new CompanySchema(companyData);
    await newCompany.save();
    return newCompany;
  }

  async updateCompany(companyId, updateData) {
    const updatedCompany = await CompanySchema.findByIdAndUpdate(
      companyId,
      { $set: updateData },
      { new: true }
    );
    if (!updatedCompany) {
      throw new Error("Company not found");
    }
    return updatedCompany;
  }

  async deleteCompany(companyId) {
    const result = await CompanySchema.findByIdAndDelete(companyId);
    if (!result) {
      throw new Error("Company not found");
    }
    return result;
  }

  async GetCompanyByOwnerID(id) {
    const company = await CompanySchema.find({ userId: id })
      .populate("userId")
      .lean();
    if (!company) {
      throw new Error("Company not found");
    }
    return company;
  }
}

module.exports = CompanyRepo;
