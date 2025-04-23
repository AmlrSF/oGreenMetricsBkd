const purchasedGoodsAndServiceRepository = require('../../../Infrastructure/Repositories/scope-3/PurchasedGoodsAndServiceRepo');
const purchasedGoodsAndServiceController = require('../../Controllers/scope-3/purchasedGoodsAndServiceController');
const purchasedGoodsAndServiceService = require('../../../Application/Services/scope-3/PurchasedGoodsAndServiceService');

async function purchasedGoodsAndServiceRoutes(fastify, options) {
  const capitalGoodsAndServiceService = new purchasedGoodsAndServiceService(purchasedGoodsAndServiceRepository);
  const capitalGoodsAndServiceController = new purchasedGoodsAndServiceController(capitalGoodsAndServiceService);

  fastify.get('/biens-services', (req, reply) => capitalGoodsAndServiceController.getCapitalGoodsAndServices(req, reply));
  fastify.post('/biens-services', (req, reply) => capitalGoodsAndServiceController.registerCapitalGoodAndService(req, reply));
  fastify.get('/biens-services/:id', (req, reply) => capitalGoodsAndServiceController.getCapitalGoodAndService(req, reply));
  fastify.put('/biens-services/:id', (req, reply) => capitalGoodsAndServiceController.updateCapitalGoodAndService(req, reply));
  fastify.delete('/biens-services/:id', (req, reply) => capitalGoodsAndServiceController.deleteCapitalGoodAndService(req, reply));
}

module.exports = purchasedGoodsAndServiceRoutes;
