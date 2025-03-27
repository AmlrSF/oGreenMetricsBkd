const BusinessTravelController = require('../../Controllers/scope-3/BusinessTravelController');
const BusinessTravelService = require('../../../Application/Services/scope-3/BusinessTravelService');
const BusinessTravelRepository = require('../../../Infrastructure/Repositories/scope-3/BusinessTravelRepo');

async function businessTravelRoutes(fastify, options) {
  const businessTravelRepository = new BusinessTravelRepository();
  const businessTravelService = new BusinessTravelService(businessTravelRepository);
  const businessTravelController = new BusinessTravelController(businessTravelService);

  fastify.get('/businessTravel', (req, reply) => businessTravelController.getBusinessTravels(req, reply));
  fastify.post('/businessTravel', (req, reply) => businessTravelController.registerBusinessTravel(req, reply));
  fastify.get('/businessTravel/:id', (req, reply) => businessTravelController.getBusinessTravel(req, reply));
  fastify.put('/businessTravel/:id', (req, reply) => businessTravelController.updateBusinessTravel(req, reply));
  fastify.delete('/businessTravel/:id', (req, reply) => businessTravelController.deleteBusinessTravel(req, reply));
}

module.exports = businessTravelRoutes;
