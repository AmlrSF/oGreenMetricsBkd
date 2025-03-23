
const CapitalGoodController = require('../../Controllers/scope-3/CapitalGoodcontrollers');
const CapitalGoodService = require('../../../Application/Services/scope-3/CapitalGoodService');
const CapitalGoodRepository = require('../../../Infrastructure/Repositories/scope-3/CapitalGoodRepo');

async function capitalGoodRoutes(fastify, options) {
  const capitalGoodRepository = new CapitalGoodRepository();
  const capitalGoodService = new CapitalGoodService(capitalGoodRepository);
  const capitalGoodController = new CapitalGoodController(capitalGoodService);

  fastify.get('/equipement', (req, reply) => capitalGoodController.getCapitalGoods(req, reply));
  fastify.post('/equipement', (req, reply) => capitalGoodController.registerCapitalGood(req, reply));
  fastify.get('/equipement/:id', (req, reply) => capitalGoodController.getCapitalGood(req, reply));
  fastify.put('/equipement/:id', (req, reply) => capitalGoodController.updateCapitalGood(req, reply));
  fastify.delete('/equipement/:id', (req, reply) => capitalGoodController.deleteCapitalGood(req, reply));
}

module.exports = capitalGoodRoutes;
