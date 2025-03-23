class TransportController {
  constructor(transportService) {
    this.transportService = transportService;
  }

 
  async getTransports(req, reply) {
    try {
      const transports = await this.transportService.getAllTransports();
      reply.send({ success: true, data: transports });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  
  async getTransport(req, reply) {
    const { id } = req.params;
    try {
      const transport = await this.transportService.getTransportById(id);
      if (transport) {
        reply.send({ success: true, data: transport });
      } else {
        reply
          .status(404)
          .send({ success: false, message: "Transport not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  
  async registerTransport(req, reply) {
    try {
      const newTransport = await this.transportService.createTransport(req.body);
      reply.send({ success: true, data: newTransport });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

 
  async updateTransport(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedTransport = await this.transportService.updateTransport(
        id,
        updateData
      );
      if (updatedTransport) {
        reply.send({ success: true, data: updatedTransport });
      } else {
        reply
          .status(404)
          .send({ success: false, message: "Transport not found" });
      }
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  
  async deleteTransport(req, reply) {
    const { id } = req.params;
    try {
      const isDeleted = await this.transportService.deleteTransport(id);
      if (isDeleted) {
        reply.send({
          success: true,
          message: "Transport deleted successfully",
        });
      } else {
        reply
          .status(404)
          .send({ success: false, message: "Transport not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = TransportController;
