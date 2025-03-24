const TransportController = require('../../Controllers/scope-3/Transportcontrollers');
const TransportService = require('../../../Application/Services/scope-3/TransportService');
const TransportRepository = require('../../../Infrastructure/Repositories/scope-3/TransportRepo');

async function transportRoutes(fastify, options) {
  const transportRepository = new TransportRepository();
  const transportService = new TransportService(transportRepository);
  const transportController = new TransportController(transportService);

  fastify.get('/transport', (req, reply) => transportController.getTransports(req, reply));
  fastify.post('/transport', (req, reply) => transportController.registerTransport(req, reply));
  fastify.get('/transport/:id', (req, reply) => transportController.getTransport(req, reply));
  fastify.put('/transport/:id', (req, reply) => transportController.updateTransport(req, reply));
  fastify.delete('/transport/:id', (req, reply) => transportController.deleteTransport(req, reply));
}

module.exports = transportRoutes;
