const DechetController = require('../../Controllers/scope-3/DechetControllers');
const DechetService = require('../../../Application/Services/scope-3/DechetService');
const DechetRepository = require('../../../Infrastructure/Repositories/scope-3/DechetRepo');

async function dechetRoutes(fastify, options) {
  const dechetRepository = new DechetRepository();
  const dechetService = new DechetService(dechetRepository);
  const dechetController = new DechetController(dechetService);

  fastify.get('/dechets', (req, reply) => dechetController.getDechets(req, reply));
  fastify.post('/dechets', (req, reply) => dechetController.registerDechet(req, reply));
  fastify.get('/dechets/:id', (req, reply) => dechetController.getDechet(req, reply));
  fastify.put('/dechets/:id', (req, reply) => dechetController.updateDechet(req, reply));
  fastify.delete('/dechets/:id', (req, reply) => dechetController.deleteDechet(req, reply));
}

module.exports = dechetRoutes;
