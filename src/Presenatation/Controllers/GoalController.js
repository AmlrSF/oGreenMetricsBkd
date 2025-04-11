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
}

module.exports = GoalController;