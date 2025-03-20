// Presentation/Controllers/energyConsumptionController.js
class EnergyConsumptionController {
  constructor(energyConsumptionService) {
    this.energyConsumptionService = energyConsumptionService;
  }

  async getEnergyConsumption(req, reply) {
    try {
      const energyConsumption = await this.energyConsumptionService.getEnergyConsumption();
      reply.send({ success: true, data: energyConsumption });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async addEnergyConsumption(req, reply) {
    const { yearlyConsumption, country } = req.body;
    try {
      const result = await this.energyConsumptionService.addEnergyConsumption(yearlyConsumption, country);
      reply.send({ success: true, data: result });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }
}

module.exports = EnergyConsumptionController;