class EmployesTransportController {
  constructor(employesTransportService) {
    this.employesTransportService = employesTransportService;
  }

  async getEmployesTransports(req, reply) {
    try {
      const transports =
        await this.employesTransportService.getAllEmployesTransports();
      reply.send({ success: true, data: transports });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async getEmployesTransport(req, reply) {
    const { id } = req.params;
    try {
      const transport =
        await this.employesTransportService.getEmployesTransportByCompanyId(
          id
        );
      if (transport) {
        reply.send({ success: true, data: transport });
      } else {
        reply
          .status(404)
          .send({ success: false, message: "Employee transport not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async registerEmployesTransport(req, reply) {
    try {
      const newTransport =
        await this.employesTransportService.createEmployesTransport(req.body);
      reply.send({ success: true, data: newTransport });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async updateEmployesTransport(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedTransport =
        await this.employesTransportService.updateEmployesTransport(
          id,
          updateData
        );
      if (updatedTransport) {
        reply.send({ success: true, data: updatedTransport });
      } else {
        reply
          .status(404)
          .send({ success: false, message: "Employee transport not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = EmployesTransportController;
