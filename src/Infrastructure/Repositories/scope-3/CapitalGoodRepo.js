require("dotenv").config();
const CapitalGood = require("../../../Domain/Entities/scope3/CapitalGoods");
class CapitalGoodRepo {
  async getScope3DataByDateRange(startDate, endDate, company_id) {
    return await CapitalGood.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      company_id: company_id,
    }).lean();
  }

  async getAllCapitalGoods() {
    return await CapitalGood.find().lean();
  }
  async getCapitalGoodByCompanyId(company_id) {
    return await CapitalGood.find({ company_id }).lean();
  }
  async createCapitalGood(capitalGoodData) {
    const newCapitalGood = new CapitalGood({
      name: capitalGoodData.name,
      category: capitalGoodData.category,
      cost: capitalGoodData.cost,
      lifetime: capitalGoodData.lifetime,
      scopeType: capitalGoodData.scopeType,
      emissionFactor: capitalGoodData.emissionFactor,
      emissions: capitalGoodData.emissions,
      company_id: capitalGoodData.company_id,
    });
    await newCapitalGood.save();
    return newCapitalGood;
  }
  async updateCapitalGood(capitalGoodId, updateData) {
    const updatedCapitalGood = await CapitalGood.findByIdAndUpdate(
      capitalGoodId,
      { $set: updateData },
      { new: true }
    );
    if (!updatedCapitalGood) throw new Error("Capital Good not found");
    return updatedCapitalGood;
  }
  async deleteCapitalGood(capitalGoodId) {
    const result = await CapitalGood.findByIdAndDelete(capitalGoodId);
    if (!result) throw new Error("Capital Good not found");
    return result;
  }
}
module.exports = CapitalGoodRepo;
