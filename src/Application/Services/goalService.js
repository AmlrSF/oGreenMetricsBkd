const GoalRepo = require('../../Infrastructure/Repositories/goalRepo');

class GoalService {
  constructor(goalRepo) {
    this.goalRepo = goalRepo;
  }

  async getGoals(companyId) {
    return await this.goalRepo.getGoalsByCompanyId(companyId);
  }

  async addOrUpdateGoals(companyId, goals) {
    return await this.goalRepo.updateGoals(companyId, goals);
  }
}

module.exports = GoalService;