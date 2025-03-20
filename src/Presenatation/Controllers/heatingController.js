class HeatingController {
  constructor(heatingService) {
    this.heatingService = heatingService;
  }

  async getHeating(req, reply) {
    try {
      const heating = await this.heatingService.getHeating();
      reply.send({ success: true, data: heating });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async addHeating(req, reply) {
    const { name, type, energy } = req.body;
    try {
      const result = await this.heatingService.addHeating(name, type, energy);
      reply.send({ success: true, data: result });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async updateHeater(req, reply) {
    const { recordId, heaterId } = req.params;
    const { name, type, energy } = req.body;
    try {
      const updatedHeating = await this.heatingService.updateHeater(recordId, heaterId, name, type, energy);
      reply.send({ success: true, data: updatedHeating });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async deleteHeater(req, reply) {
    const { recordId, heaterId } = req.params;
    try {
      const updatedHeating = await this.heatingService.deleteHeater(recordId, heaterId);
      reply.send({ success: true, data: updatedHeating });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }
}

module.exports = HeatingController;