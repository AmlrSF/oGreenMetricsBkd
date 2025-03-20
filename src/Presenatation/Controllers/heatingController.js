// Presentation/Controllers/heatingController.js
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
}

module.exports = HeatingController;