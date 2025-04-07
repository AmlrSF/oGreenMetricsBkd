const CoolingRepo = require('../../../Infrastructure/Repositories/scope2/coolingRepo');
const CoolingService = require('../../../Application/Services/scope2/coolingService');
const CoolingController = require('../../Controllers/scope2/coolingController');

async function coolingRoute(fastify, options) {
  const coolingRepo = new CoolingRepo();
  const coolingService = new CoolingService(coolingRepo);
  const coolingController = new CoolingController(coolingService);

  fastify.get('/cooling/:company_id', (req, reply) => coolingController.getCooling(req, reply));
  fastify.post('/cooling', (req, reply) => coolingController.addCooling(req, reply));
  fastify.put('/cooling/:recordId/cooler/:coolerId', (req, reply) => coolingController.updateCooler(req, reply));
  fastify.delete('/cooling/:recordId/cooler/:coolerId', (req, reply) => coolingController.deleteCooler(req, reply));
}

module.exports = coolingRoute;