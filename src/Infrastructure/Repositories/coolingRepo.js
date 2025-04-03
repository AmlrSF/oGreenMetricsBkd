const CoolingSchema = require('../../Domain/Entities/cooling');

class CoolingRepo {


  async getScope2DataByDateRange(startDate, endDate, company_id) {
    return await CoolingSchema.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      company_id: company_id, 
    }).lean();
  }

  async getCoolingByCompanyId(company_id) { 
    const coolingData = await CoolingSchema.find({ company_id }).lean();
    return coolingData.length > 0 ? coolingData[0] : { coolers: [], totalEmissions: 0, company_id };
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
    if (!updatedCooling) throw new Error('Cooling record not found');
    return updatedCooling;
  }

  async deleteCooler(recordId, coolerId) {
    const record = await CoolingSchema.findById(recordId);
    if (!record) throw new Error('Cooling record not found');
    const coolerIndex = record.coolers.findIndex(cooler => cooler._id.toString() === coolerId);
    if (coolerIndex === -1) throw new Error('Cooler not found');
    const [cooler] = record.coolers.splice(coolerIndex, 1);
    record.totalEmissions -= cooler.emissions;
    await record.save();
    return record;
  }
}

module.exports = CoolingRepo;