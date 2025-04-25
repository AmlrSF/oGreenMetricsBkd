const Goal = require('../../Domain/Entities/goal');

class GoalRepo {
  async getGoalsByCompanyId(companyId) {
    return await Goal.findOne({ company_id: companyId }).lean();
  }

  async getGoalsByCompanyIdAndYear(companyId, year) {
    return await Goal.find({ 
      company_id: companyId,
      year: year 
    }).lean();
  }

  async getAllGoalsByCompanyId(companyId) {
    return await Goal.find({ company_id: companyId }).sort({ year: -1 }).lean();
  }

  async createGoals(goalData) {
    const newGoal = new Goal(goalData);
    await newGoal.save();
    return newGoal;
  }

  async updateGoals(companyId, updateData) {
    const updatedGoal = await Goal.findOneAndUpdate(
      { company_id: companyId },
      { $set: updateData },
      { new: true, upsert: true }
    );
    return updatedGoal;
  }

  async updateGoalById(goalId, updateData) {
    const updatedGoal = await Goal.findByIdAndUpdate(
      goalId,
      { $set: updateData },
      { new: true }
    );
    return updatedGoal;
  }

  async deleteGoal(goalId) {
    return await Goal.findByIdAndDelete(goalId);
  }

  async checkGoalAttainment(companyId, currentEmissions) {
    const goals = await Goal.find({ company_id: companyId });
    
    const attainedGoals = goals.filter(goal => {
      return (currentEmissions.scope1 <= goal.scope1Goal &&
              currentEmissions.scope2 <= goal.scope2Goal &&
              currentEmissions.scope3 <= goal.scope3Goal);
    });
    
    return attainedGoals;
  }

  async getGoalById(goalId) {
    const goal = await Goal.findById(goalId).lean();
    if (!goal) {
      throw new Error('Goal not found');
    }
    return goal;
  }
}

module.exports = GoalRepo;