// repositories/goalRepo.js
const Goal = require('../../Domain/Entities/goal');

class GoalRepo {
  async getGoalsByCompanyId(companyId) {
    return await Goal.findOne({ company_id: companyId }).lean();
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
}

module.exports = GoalRepo;