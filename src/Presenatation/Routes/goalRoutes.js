// routes/goalRoutes.js
const GoalRepo = require('../../Infrastructure/Repositories/goalRepo');
const GoalService = require('../../Application/Services/goalService');
const GoalController = require('../Controllers/GoalController');

async function goalRoutes(fastify, options) {
  const goalRepo = new GoalRepo();
  const goalService = new GoalService(goalRepo);
  const goalController = new GoalController(goalService);

  fastify.get('/goals/:company_id', (req, reply) => goalController.getGoals(req, reply));
  fastify.post('/goals', (req, reply) => goalController.saveGoals(req, reply));
}

module.exports = goalRoutes;