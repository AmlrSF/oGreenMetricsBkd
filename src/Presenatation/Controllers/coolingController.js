// Presentation/Controllers/coolingController.js
class CoolingController {
  constructor(coolingService) {
    this.coolingService = coolingService;
  }

  async getCooling(req, reply) {
    try {
      const cooling = await this.coolingService.getCooling();
      reply.send({ success: true, data: cooling });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async addCooling(req, reply) {
    const { name, type, energy } = req.body;
    try {
      const result = await this.coolingService.addCooling(name, type, energy);
      reply.send({ success: true, data: result });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }
}

module.exports = CoolingController;