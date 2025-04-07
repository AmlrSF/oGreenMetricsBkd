const EnergyConsumptionRepo = require('../../Infrastructure/Repositories/scope2/energyConsumptionRepo');
const EnergyConsumptionService = require('../../Application/Services/energyConsumptionService');
const EnergyConsumptionController = require('../Controllers/energyConsumptionController');

async function energyConsumptionRoute(fastify, options) {
  const energyConsumptionRepo = new EnergyConsumptionRepo();
  const energyConsumptionService = new EnergyConsumptionService(energyConsumptionRepo);
  const energyConsumptionController = new EnergyConsumptionController(energyConsumptionService);

  fastify.get('/energy-consumption/:company_id', (req, reply) => energyConsumptionController.getEnergyConsumption(req, reply));
  fastify.post('/energy-consumption', (req, reply) => energyConsumptionController.addEnergyConsumption(req, reply));
  fastify.put('/energy-consumption/:id', (req, reply) => energyConsumptionController.updateEnergyConsumption(req, reply));
  fastify.delete('/energy-consumption/:id', (req, reply) => energyConsumptionController.deleteEnergyConsumption(req, reply));
}

module.exports = energyConsumptionRoute;