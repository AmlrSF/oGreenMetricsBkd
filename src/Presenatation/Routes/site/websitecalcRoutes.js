const WebsiteCalcController = require('../../Controllers/site/websiteCalc');

async function websiteCalcRoutes(fastify, options) {
  fastify.get('/carbon', (req, reply) => WebsiteCalcController.calculate(req, reply));
}

module.exports = websiteCalcRoutes;
