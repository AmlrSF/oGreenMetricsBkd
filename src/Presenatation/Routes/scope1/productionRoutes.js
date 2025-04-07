const productionController = require('../../Controllers/scope1/productionController');
const authMiddleware = require('../../../Domain/Middleware/authMiddleware');

async function productionRoutes(fastify, options) {
  fastify.post('/production', { preHandler: authMiddleware }, async (req, reply) => await productionController.addProduction(req, reply));
  fastify.get('/production', { preHandler: authMiddleware }, async (req, reply) => await productionController.getProductions(req, reply));
  fastify.put('/production/:id', { preHandler: authMiddleware }, async (req, reply) => await productionController.updateProduction(req, reply));
  fastify.delete('/production/:id', { preHandler: authMiddleware }, async (req, reply) => await productionController.deleteProduction(req, reply));
}

module.exports = productionRoutes;