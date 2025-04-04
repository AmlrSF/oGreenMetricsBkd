const HeatingSchema = require("../../Domain/Entities/heating");

class HeatingRepo {
  
  async getHeatByid(company_id) {
    return await HeatingSchema.find({company_id: company_id}).lean();
  }

  async getHeatingByCompanyId(company_id) {
    const heatingData = await HeatingSchema.find({ company_id }).lean();
    return heatingData.length > 0
      ? heatingData[0]
      : { heaters: [], totalEmissions: 0, company_id };
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
    if (!updatedHeating) throw new Error("Heating record not found");
    return updatedHeating;
  }

  async deleteHeater(recordId, heaterId) {
    const record = await HeatingSchema.findById(recordId);
    if (!record) throw new Error("Heating record not found");
    const heaterIndex = record.heaters.findIndex(
      (heater) => heater._id.toString() === heaterId
    );
    if (heaterIndex === -1) throw new Error("Heater not found");
    const [heater] = record.heaters.splice(heaterIndex, 1);
    record.totalEmissions -= heater.emissions;
    await record.save();
    return record;
  }
}

module.exports = HeatingRepo;
