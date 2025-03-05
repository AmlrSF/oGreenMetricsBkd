const CompanySchema = require("../../Domain/Entities/company");
const mongoose = require("mongoose");
require("dotenv").config();

class CompanyRepo {
  
  async getAllCompanies() {
    const companiesData = await CompanySchema.find().lean();
    return companiesData;
  }

  async getCompanyById(companyId) {
    const company = await CompanySchema.findById(companyId).lean();
    if (!company) {
      throw new Error('Company not found');
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
      throw new Error('Company not found');
    }
    return updatedCompany;
  }

  async deleteCompany(companyId) {
    const result = await CompanySchema.findByIdAndDelete(companyId);
    if (!result) {
      throw new Error('Company not found');
    }
    return result;
  }

}

module.exports = CompanyRepo; 
