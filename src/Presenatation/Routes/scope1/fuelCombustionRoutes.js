const fuelCombustionController = require('../../Controllers/scope1/fuelCombustionController');
const authMiddleware = require('../../../Domain/Middleware/authMiddleware');

async function fuelCombustionRoutes(fastify, options) {
  fastify.post('/fuelcombustion', { preHandler: authMiddleware }, async (req, reply) => await fuelCombustionController.addFuelCombution(req, reply));
  fastify.get('/fuelcombustion', { preHandler: authMiddleware }, async (req, reply) => await fuelCombustionController.getFuelCombutions(req, reply));
  fastify.put('/fuelcombustion/:id', { preHandler: authMiddleware }, async (req, reply) => await fuelCombustionController.updateFuelCombution(req, reply));
  fastify.delete('/fuelcombustion/:id', { preHandler: authMiddleware }, async (req, reply) => await fuelCombustionController.deleteFuelCombution(req, reply));
}

module.exports = fuelCombustionRoutes;