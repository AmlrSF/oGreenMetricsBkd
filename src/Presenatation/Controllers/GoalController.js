const mongoose = require('mongoose')

class GoalController {
  constructor(goalService) {
    this.goalService = goalService;
  }

  async getGoals(req, reply) {
    const { company_id } = req.params;
    try {
      const goals = await this.goalService.getGoals(company_id);
      reply.send({ success: true, data: goals });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async getAllGoals(req, reply) {
    const { company_id } = req.params;
    try {
      const goals = await this.goalService.getAllGoals(company_id);
      reply.send({ success: true, data: goals });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async getGoalsByYear(req, reply) {
    const { company_id, year } = req.params;
    try {
      const goals = await this.goalService.getGoalsByYear(company_id, year);
      reply.send({ success: true, data: goals });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async saveGoals(req, reply) {
    const { company_id } = req.body;
    const goals = req.body.goals;
    try {
      const result = await this.goalService.addOrUpdateGoals(company_id, goals);
      reply.send({ success: true, data: result });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async addNewGoal(req, reply) {
    const goalData = req.body;
    try {
      const result = await this.goalService.addNewGoal(goalData);
      reply.send({ success: true, data: result });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async updateGoal(req, reply) {
    const { goal_id } = req.params;
    const updateData = req.body;
    if (!mongoose.Types.ObjectId.isValid(goal_id)) {
      return reply.status(400).send({ success: false, message: 'Invalid goal ID' });
    }
    try {
      const result = await this.goalService.updateGoal(goal_id, updateData);
      reply.send({ success: true, data: result });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async deleteGoal(req, reply) {
    const { goal_id } = req.params;
    try {
      await this.goalService.deleteGoal(goal_id);
      reply.send({ success: true, message: 'Goal deleted successfully' });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  async checkGoalAttainment(req, reply) {
    const { company_id } = req.params;
    const { currentEmissions, userId } = req.body; // Updated to extract userId
    try {
      const attainedGoals = await this.goalService.checkGoalAttainment(company_id, currentEmissions, userId); // Pass userId
      reply.send({ success: true, data: attainedGoals });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = GoalController;