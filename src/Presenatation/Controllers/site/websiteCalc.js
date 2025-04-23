// Controllers/websiteCalculator/websiteCalc.js
const WebsiteCalcService = require('../../../Application/Services/Site/websiteCalcService');

class WebsiteCalcController {
  async calculate(req, reply) {
    try {
      const { url } = req.query;
      if (!url) {
        return reply.code(400).send({ error: 'URL parameter is required' });
      }

      const data = await WebsiteCalcService.calculateCarbonImpact(url);
      reply.send(data);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }
}

module.exports = new WebsiteCalcController();