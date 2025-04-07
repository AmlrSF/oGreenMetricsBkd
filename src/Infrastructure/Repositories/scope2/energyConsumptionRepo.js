const EnergyConsumptionSchema = require("../../../Domain/Entities/scope2/energyConsumption");

class EnergyConsumptionRepo {
  
  async getEnergyByCompanyId(company_id) {
    return await EnergyConsumptionSchema.find({
      company_id: company_id,
    }).lean();
  }

  async getEnergyConsumptionByCompanyId(company_id) {
    const energyData = await EnergyConsumptionSchema.find({
      company_id,
    }).lean();
    return energyData.length > 0
      ? energyData[0]
      : { yearlyConsumption: 0, emissions: 0, country: null, company_id };
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
    if (!updatedEnergy) throw new Error("EnergyConsumption record not found");
    return updatedEnergy;
  }

  async deleteEnergyConsumption(id) {
    const result = await EnergyConsumptionSchema.findByIdAndDelete(id);
    if (!result) throw new Error("EnergyConsumption record not found");
    return result;
  }
}

module.exports = EnergyConsumptionRepo;
