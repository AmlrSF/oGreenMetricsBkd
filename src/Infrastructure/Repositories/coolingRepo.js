// Repositories/coolingRepo.js
const CoolingSchema = require('../../Domain/Entities/cooling');

class CoolingRepo {
  async getCooling() {
    const coolingData = await CoolingSchema.find().lean();
    return coolingData.length > 0 ? coolingData[0] : { coolers: [], totalEmissions: 0 };
  }

  async createCooling(coolingData) {
    const newCooling = new CoolingSchema(coolingData);
    await newCooling.save();
    return newCooling;
  }

  async updateCooling(id, updateData) {
    const updatedCooling = await CoolingSchema.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedCooling) {
      throw new Error('Cooling record not found');
    }
    return updatedCooling;
  }
}

module.exports = CoolingRepo;