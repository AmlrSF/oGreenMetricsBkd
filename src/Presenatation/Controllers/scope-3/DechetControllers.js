class DechetController {
  constructor(dechetService) {
    this.dechetService = dechetService;
  }

  async getDechets(req, reply) {
    try {
      const dechets = await this.dechetService.getAllDechets();
      reply.send({ success: true, data: dechets });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async getDechet(req, reply) {
    const { id } = req.params;
    try {
      const dechet = await this.dechetService.getDechetById(id);
      if (dechet) {
        reply.send({ success: true, data: dechet });
      } else {
        reply.status(404).send({ success: false, message: "Dechet not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async registerDechet(req, reply) {
    try {
      const newDechet = await this.dechetService.createDechet(req.body);
      reply.send({ success: true, data: newDechet });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async updateDechet(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedDechet = await this.dechetService.updateDechet(
        id,
        updateData
      );
      if (updatedDechet) {
        reply.send({ success: true, data: updatedDechet });
      } else {
        reply.status(404).send({ success: false, message: "Dechet not found" });
      }
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async deleteDechet(req, reply) {
    const { id } = req.params;
    try {
      const isDeleted = await this.dechetService.deleteDechet(id);
      if (isDeleted) {
        reply.send({ success: true, message: "Dechet deleted successfully" });
      } else {
        reply.status(404).send({ success: false, message: "Dechet not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = DechetController;
