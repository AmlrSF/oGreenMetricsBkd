// Modified fuelRoutes.js
const fuelController = require('../Controllers/fuelController');
const authMiddleware = require('../../Domain/Middleware/authMiddleware');

async function fuelRoutes(fastify, options) {
  // Add preHandler hook for authentication
  fastify.post('/fuelcombution', { preHandler: authMiddleware }, async (req, reply) => await fuelController.addFuelCombution(req, reply));
  fastify.get('/fuelcombution', { preHandler: authMiddleware }, async (req, reply) => await fuelController.getFuelCombutions(req, reply));
  fastify.post('/production', { preHandler: authMiddleware }, async (req, reply) => await fuelController.addProduction(req, reply));
  fastify.get('/production', { preHandler: authMiddleware }, async (req, reply) => await fuelController.getProductions(req, reply));
  fastify.put('/fuelcombution/:id', { preHandler: authMiddleware }, async (req, reply) => await fuelController.updateFuelCombution(req, reply));
  fastify.delete('/fuelcombution/:id', { preHandler: authMiddleware }, async (req, reply) => await fuelController.deleteFuelCombution(req, reply));
  fastify.put('/production/:id', { preHandler: authMiddleware }, async (req, reply) => await fuelController.updateProduction(req, reply));
  fastify.delete('/production/:id', { preHandler: authMiddleware }, async (req, reply) => await fuelController.deleteProduction(req, reply));
}

module.exports = fuelRoutes;