const fuelService = require('../../Application/Services/fuelService');

class FuelController {
  async addFuelCombution(req, reply) {
    try {
      console.log('Inside addFuelCombution:', req.body);
      const data = req.body;
      const result = await fuelService.addFuelCombution(data);
      reply.code(201).send(result);
    } catch (error) {
      console.error('Error in addFuelCombution:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }

  async getFuelCombutions(req, reply) {
    try {
      console.log('Inside getFuelCombutions');
      const fuelCombutions = await fuelService.getFuelCombutions();
      reply.code(200).send(fuelCombutions);
    } catch (error) {
      console.error('Error in getFuelCombutions:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }

  async addProduction(req, reply) {
    try {
      console.log('Inside addProduction:', req.body);
      const data = req.body;
      const result = await fuelService.addProduction(data);
      reply.code(201).send(result);
    } catch (error) {
      console.error('Error in addProduction:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }

  async getProductions(req, reply) {
    try {
      console.log('Inside getProductions');
      const productions = await fuelService.getProductions();
      reply.code(200).send(productions);
    } catch (error) {
      console.error('Error in getProductions:', error.message);
      reply.code(500).send({ error: error.message });
    }
  }
}

module.exports = new FuelController();