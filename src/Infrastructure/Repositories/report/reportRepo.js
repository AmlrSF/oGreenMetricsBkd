require("dotenv").config();
const Report = require("../../../Domain/Entities/reporting/report"); // Ensure the path is correct

class ReportRepo {
  async getAllReports(company_id) {

    return await Report.find({company_id}).lean();
  }

  async getReportById(reportId) {
    const report = await Report.findById(reportId).populate([
      { path: "scope1Data.refId" },
      { path: "scope2Data.refId" },
      { path: "scope3Data.refId" },
    ]).lean();
    if (!report) {
      throw new Error("Report not found");
    }
    return report;
  }

  async createReport(reportData) {
    const newReport = new Report({
      name: reportData.name,
      description: reportData.description,
      company_id: reportData.company_id,
      
      scope1: reportData.scope1,
      scope2: reportData.scope2,
      scope3: reportData.scope3,
      
      startDate: reportData.startDate,
      endDate: reportData.endDate,
      
      includeCharts: reportData.includeCharts,
      detailLevel: reportData.detailLevel,
      
      scope1Data: reportData.scope1Data,
      scope2Data: reportData.scope2Data,
      scope3Data: reportData.scope3Data,
      
      status: "pending",
    });
    await newReport.save();
    return newReport;
  }

  async updateReport(reportId, updateData) {
    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { $set: updateData },
      { new: true }
    );
    if (!updatedReport) {
      throw new Error("Report not found");
    }
    return updatedReport;
  }

  async deleteReport(reportId) {
    const result = await Report.findByIdAndDelete(reportId);
    if (!result) {
      throw new Error("Report not found");
    }
    return result;
  }
}

module.exports = ReportRepo;
