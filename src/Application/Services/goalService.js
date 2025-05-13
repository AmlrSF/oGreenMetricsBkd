const GoalRepo = require('../../Infrastructure/Repositories/goalRepo');
const NotificationService = require("./NotificationService");

class GoalService {
  constructor(goalRepo, notificationService) {
    this.goalRepo = goalRepo;
    this.notificationService = notificationService || new NotificationService(new (require("../../Infrastructure/Repositories/NotificationRepo"))());
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
    goals.totalGoal = parseFloat(goals.scope1Goal || 0) + 
                      parseFloat(goals.scope2Goal || 0) + 
                      parseFloat(goals.scope3Goal || 0);
    
    return await this.goalRepo.updateGoals(companyId, goals);
  }

  async addNewGoal(goalData) {
    goalData.totalGoal = parseFloat(goalData.scope1Goal || 0) + 
                         parseFloat(goalData.scope2Goal || 0) + 
                         parseFloat(goalData.scope3Goal || 0);
    
    return await this.goalRepo.createGoals(goalData);
  }

  async updateGoal(goalId, updateData) {
    try {
      if (
        updateData.scope1Goal !== undefined ||
        updateData.scope2Goal !== undefined ||
        updateData.scope3Goal !== undefined
      ) {
        const goal = await this.goalRepo.getGoalById(goalId);
        const scope1 = updateData.scope1Goal !== undefined ? updateData.scope1Goal : goal.scope1Goal;
        const scope2 = updateData.scope2Goal !== undefined ? updateData.scope2Goal : goal.scope2Goal;
        const scope3 = updateData.scope3Goal !== undefined ? updateData.scope3Goal : goal.scope3Goal;
        updateData.totalGoal = parseFloat(scope1 || 0) + parseFloat(scope2 || 0) + parseFloat(scope3 || 0);
      }
      return await this.goalRepo.updateGoalById(goalId, updateData);
    } catch (error) {
      throw new Error(`Failed to update goal: ${error.message}`);
    }
  }

  async deleteGoal(goalId) {
    return await this.goalRepo.deleteGoal(goalId);
  }

  async checkGoalAttainment(companyId, currentEmissions, userId) {
    const goals = await this.goalRepo.getAllGoalsByCompanyId(companyId);
    
    const attainedGoals = [];
    for (const goal of goals) {
      const isScope1Achieved = goal.scope1Goal === 0 || currentEmissions.scope1 <= goal.scope1Goal;
      const isScope2Achieved = goal.scope2Goal === 0 || currentEmissions.scope2 <= goal.scope2Goal;
      const isScope3Achieved = goal.scope3Goal === 0 || currentEmissions.scope3 <= goal.scope3Goal;
      
      if (isScope1Achieved && isScope2Achieved && isScope3Achieved) {
        attainedGoals.push(goal);
        if (goal.status !== 'achieved') {
          await this.goalRepo.updateGoalById(goal._id, { status: 'achieved' });
          await this.notificationService.createGoalAchievedNotification(
            userId,
            goal._id,
            goal.name,
            goal.year
          );
        }
      }
    }
    
    return attainedGoals;
  }
}

module.exports = GoalService;