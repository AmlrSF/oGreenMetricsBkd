class ReportController {
  constructor(reportService, ShowDataService) {
    this.reportService = reportService;
    this.ShowDataService = ShowDataService;
  }

  // Get all reports
  async getReports(req, reply) {
    const { id } = req.params;
    try {
      console.log(id);

      const reports = await this.reportService.getAllReports(id);
      reply.send({ success: true, data: reports });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async getAllReportsData(req, reply) {
    try {
      const reports = await this.reportService.getAllReportsData();
      reply.send({ success: true, data: reports });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  // Get report by ID
  async getReport(req, reply) {
    const { id } = req.params;
    try {
      const report = await this.reportService.getReportById(id);
      if (report) {
        reply.send({ success: true, data: report });
      } else {
        reply.status(404).send({
          success: false,
          message: "Report not found",
        });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  // Create a new report
  async createReport(req, reply) {
    try {
      console.log(req.body);

      const newReport = await this.reportService.createReport(req.body);
      reply.send({ success: true, data: newReport });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  // Update an existing report
  async updateReport(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedReport = await this.reportService.updateReport(
        id,
        updateData
      );
      if (updatedReport) {
        reply.send({ success: true, data: updatedReport });
      } else {
        reply.status(404).send({
          success: false,
          message: "Report not found",
        });
      }
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  // Delete a report
  async deleteReport(req, reply) {
    const { id } = req.params;
    try {
      const isDeleted = await this.reportService.deleteReport(id);
      if (isDeleted) {
        reply.send({
          success: true,
          message: "Report deleted successfully",
        });
      } else {
        reply.status(404).send({
          success: false,
          message: "Report not found",
        });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async getFullCompanyReport(req, reply) {
    const { company_id } = req.params;

    try {
      const fullReport = await this.ShowDataService.getFullDataByCompany(
        company_id
      );
      reply.send({ success: true, data: fullReport });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = ReportController;
