const GoalRepo = require('../../Infrastructure/Repositories/goalRepo');
const GoalService = require('../../Application/Services/goalService');
const GoalController = require('../Controllers/GoalController');

async function goalRoutes(fastify, options) {
  const goalRepo = new GoalRepo();
  const goalService = new GoalService(goalRepo);
  const goalController = new GoalController(goalService);

  // Get goals for a company
  fastify.get('/goals/:company_id', (req, reply) => goalController.getGoals(req, reply));
  
  // Get all goals for a company
  fastify.get('/goals/all/:company_id', (req, reply) => goalController.getAllGoals(req, reply));
  
  // Get goals for a specific year
  fastify.get('/goals/:company_id/:year', (req, reply) => goalController.getGoalsByYear(req, reply));
  
  // Add or update goals
  fastify.post('/goals', (req, reply) => goalController.saveGoals(req, reply));
  
  // Add new goal
  fastify.post('/goals/new', (req, reply) => goalController.addNewGoal(req, reply));
  
  // Update existing goal
  fastify.put('/goals/:goal_id', (req, reply) => goalController.updateGoal(req, reply));
  
  // Delete a goal
  fastify.delete('/goals/:goal_id', (req, reply) => goalController.deleteGoal(req, reply));
  
  // Check goal attainment
  fastify.post('/goals/check-attainment/:company_id', (req, reply) => 
    goalController.checkGoalAttainment(req, reply));
}

module.exports = goalRoutes;