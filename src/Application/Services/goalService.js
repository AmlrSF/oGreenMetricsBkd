const GoalRepo = require('../../Infrastructure/Repositories/goalRepo');

class GoalService {
  constructor(goalRepo) {
    this.goalRepo = goalRepo;
  }

  async getGoals(companyId) {
    return await this.goalRepo.getGoalsByCompanyId(companyId);
  }

  async getAllGoals(companyId) {
    return await this.goalRepo.getAllGoalsByCompanyId(companyId);
  }

  async getGoalsByYear(companyId, year) {
    return await this.goalRepo.getGoalsByCompanyIdAndYear(companyId, year);
  }

  async addOrUpdateGoals(companyId, goals) {
    // Calculate total goal
    goals.totalGoal = parseFloat(goals.scope1Goal || 0) + 
                       parseFloat(goals.scope2Goal || 0) + 
                       parseFloat(goals.scope3Goal || 0);
    
    return await this.goalRepo.updateGoals(companyId, goals);
  }

  async addNewGoal(goalData) {
    // Calculate total goal
    goalData.totalGoal = parseFloat(goalData.scope1Goal || 0) + 
                          parseFloat(goalData.scope2Goal || 0) + 
                          parseFloat(goalData.scope3Goal || 0);
    
    return await this.goalRepo.createGoals(goalData);
  }

  async updateGoal(goalId, updateData) {
    try {
      // If scope values are updated, recalculate total
      if (
        updateData.scope1Goal !== undefined ||
        updateData.scope2Goal !== undefined ||
        updateData.scope3Goal !== undefined
      ) {
        // Get current goal data
        const goal = await this.goalRepo.getGoalById(goalId);
        // Update with new values or keep current values
        const scope1 =
          updateData.scope1Goal !== undefined
            ? updateData.scope1Goal
            : goal.scope1Goal;
        const scope2 =
          updateData.scope2Goal !== undefined
            ? updateData.scope2Goal
            : goal.scope2Goal;
        const scope3 =
          updateData.scope3Goal !== undefined
            ? updateData.scope3Goal
            : goal.scope3Goal;
        // Calculate new total
        updateData.totalGoal =
          parseFloat(scope1 || 0) +
          parseFloat(scope2 || 0) +
          parseFloat(scope3 || 0);
      }
      return await this.goalRepo.updateGoalById(goalId, updateData);
    } catch (error) {
      throw new Error(`Failed to update goal: ${error.message}`);
    }
  }

  async deleteGoal(goalId) {
    return await this.goalRepo.deleteGoal(goalId);
  }

  async checkGoalAttainment(companyId, currentEmissions) {
    return await this.goalRepo.checkGoalAttainment(companyId, currentEmissions);
  }
}

module.exports = GoalService;