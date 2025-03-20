const EnergyConsumptionSchema = require('../../Domain/Entities/energyConsumption');

class EnergyConsumptionRepo {
  async getEnergyConsumption() {
    const energyData = await EnergyConsumptionSchema.find().lean();
    return energyData.length > 0 ? energyData[0] : { yearlyConsumption: 0, emissions: 0, country: null };
  }

  async createEnergyConsumption(energyData) {
    const newEnergy = new EnergyConsumptionSchema(energyData);
    await newEnergy.save();
    return newEnergy;
  }

  async updateEnergyConsumption(id, updateData) {
    const updatedEnergy = await EnergyConsumptionSchema.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedEnergy) {
      throw new Error('EnergyConsumption record not found');
    }
    return updatedEnergy;
  }

  async deleteEnergyConsumption(id) {
    const result = await EnergyConsumptionSchema.findByIdAndDelete(id);
    if (!result) {
      throw new Error('EnergyConsumption record not found');
    }
    return result;
  }
}

module.exports = EnergyConsumptionRepo;