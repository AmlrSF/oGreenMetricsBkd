const fuelController = require('../Controllers/fuelController');

async function fuelRoutes(fastify, options) {
  fastify.post('/fuelcombution', async (req, reply) => await fuelController.addFuelCombution(req, reply));
  fastify.get('/fuelcombution', async (req, reply) => await fuelController.getFuelCombutions(req, reply));
  fastify.post('/production', async (req, reply) => await fuelController.addProduction(req, reply));
  fastify.get('/production', async (req, reply) => await fuelController.getProductions(req, reply));
}

module.exports = fuelRoutes;