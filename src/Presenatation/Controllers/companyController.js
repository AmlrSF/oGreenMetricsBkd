class companyController {
  constructor(companyService) {
    this.companyService = companyService;
  }

  async getCompanies(req, reply) {
    try {
      const companies = await this.companyService.getAllCompanies();
      reply.send({ success: true, data: companies });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async registercompany(req, reply) {
    const { companyName, companyEmail, companyAddress } = req.body;
    try {
      const newCompany = await this.companyService.createCompany(
        companyName,
        companyEmail,
        companyAddress
      );
      reply.status(201).send({ success: true, data: newCompany });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async updatecompany(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedCompany = await this.companyService.updateCompany(
        id,
        updateData
      );
      reply.send({ success: true, data: updatedCompany });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async getcompany(req, reply) {
    const { id } = req.params;
    try {
      const company = await this.companyService.getCompanyById(id);
      reply.send({ success: true, data: company });
    } catch (error) {
      reply.status(404).send({ success: false, message: error.message });
    }
  }

  async deletecompany(req, reply) {
    const { id } = req.params;
    try {
      const isDeleted = await this.companyService.deleteCompany(id);
      if (isDeleted) {
        reply.send({ success: true, message: "Company deleted successfully" });
      } else {
        reply
          .status(404)
          .send({ success: false, message: "Company not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = companyController;
