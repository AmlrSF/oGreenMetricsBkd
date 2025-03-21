// Modified fuelRoutes.js
const fuelController = require('../Controllers/fuelController');
const authMiddleware = require('../../Domain/Middleware/authMiddleware');

async function fuelRoutes(fastify, options) {
  // Add preHandler hook for authentication
  fastify.post('/fuelcombution', { preHandler: authMiddleware }, async (req, reply) => await fuelController.addFuelCombution(req, reply));
  fastify.get('/fuelcombution', { preHandler: authMiddleware }, async (req, reply) => await fuelController.getFuelCombutions(req, reply));
  fastify.post('/production', { preHandler: authMiddleware }, async (req, reply) => await fuelController.addProduction(req, reply));
  fastify.get('/production', { preHandler: authMiddleware }, async (req, reply) => await fuelController.getProductions(req, reply));
}

module.exports = fuelRoutes;