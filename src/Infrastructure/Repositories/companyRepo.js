const CompanySchema = require("../../Domain/Entities/company");
const mongoose = require("mongoose");
require("dotenv").config();

class CompanyRepo {
  // Get all companies
  async getAllCompanies() {
    const companiesData = await CompanySchema.find().lean();
    return companiesData;
  }

  // Get a company by ID
  async getCompanyById(companyId) {
    const company = await CompanySchema.findById(companyId).lean();
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  }

  // Create a new company
  async createCompany(companyData) {
    const newCompany = new CompanySchema(companyData);
    await newCompany.save();
    return newCompany;
  }

  // Update a company by ID
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

  // Delete a company by ID
  async deleteCompany(companyId) {
    const result = await CompanySchema.findByIdAndDelete(companyId);
    if (!result) {
      throw new Error('Company not found');
    }
    return result;
  }
}

module.exports = CompanyRepo; // Export the class, not an instance
