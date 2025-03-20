// Presentation/Routes/energyConsumptionRoutes.js
const EnergyConsumptionRepo = require('../../Infrastructure/Repositories/energyConsumptionRepo');
const EnergyConsumptionService = require('../../Application/Services/energyConsumptionService');
const EnergyConsumptionController = require('../Controllers/energyConsumptionController');

async function energyConsumptionRoute(fastify, options) {
  const energyConsumptionRepo = new EnergyConsumptionRepo();
  const energyConsumptionService = new EnergyConsumptionService(energyConsumptionRepo);
  const energyConsumptionController = new EnergyConsumptionController(energyConsumptionService);

  fastify.get('/energy-consumption', (req, reply) => energyConsumptionController.getEnergyConsumption(req, reply));
  fastify.post('/energy-consumption', (req, reply) => energyConsumptionController.addEnergyConsumption(req, reply));
}

module.exports = energyConsumptionRoute;