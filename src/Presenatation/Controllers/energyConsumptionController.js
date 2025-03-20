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

  async updateEnergyConsumption(req, reply) {
    const { id } = req.params;
    const { yearlyConsumption, country } = req.body;
    try {
      const updatedEnergy = await this.energyConsumptionService.updateEnergyConsumption(id, yearlyConsumption, country);
      reply.send({ success: true, data: updatedEnergy });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async deleteEnergyConsumption(req, reply) {
    const { id } = req.params;
    try {
      await this.energyConsumptionService.deleteEnergyConsumption(id);
      reply.send({ success: true, message: 'EnergyConsumption deleted successfully' });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }
}

module.exports = EnergyConsumptionController;