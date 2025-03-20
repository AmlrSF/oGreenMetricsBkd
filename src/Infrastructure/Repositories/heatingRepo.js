// Repositories/heatingRepo.js
const HeatingSchema = require('../../Domain/Entities/heating');

class HeatingRepo {
  async getHeating() {
    const heatingData = await HeatingSchema.find().lean();
    return heatingData.length > 0 ? heatingData[0] : { heaters: [], totalEmissions: 0 };
  }

  async createHeating(heatingData) {
    const newHeating = new HeatingSchema(heatingData);
    await newHeating.save();
    return newHeating;
  }

  async updateHeating(id, updateData) {
    const updatedHeating = await HeatingSchema.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedHeating) {
      throw new Error('Heating record not found');
    }
    return updatedHeating;
  }
}

module.exports = HeatingRepo;