const SiteControllers = require('../../../Presenatation/Controllers/site/siteControllers');
const SiteService = require('../../../Application/Services/Site/siteService');
const siteRepository = require('../../../Infrastructure/Repositories/site/siteRepo');

async function siteRoutes(fastify, options) {
  
  const siteService = new SiteService(siteRepository);
  const siteController = new SiteControllers(siteService);
  
  fastify.get('/site', (req, reply) => siteController.getSites(req, reply));
  fastify.post('/site', (req, reply) => siteController.registerSite(req, reply));
  fastify.get('/siteByuser/:id', (req, reply) => siteController.getSitesByUserId(req, reply));
  fastify.get('/site/:id', (req, reply) => siteController.getSite(req, reply));
  fastify.put('/site/:id', (req, reply) => siteController.updateSite(req, reply));
  fastify.delete('/site/:id', (req, reply) => siteController.deleteSite(req, reply));

}

module.exports = siteRoutes;  