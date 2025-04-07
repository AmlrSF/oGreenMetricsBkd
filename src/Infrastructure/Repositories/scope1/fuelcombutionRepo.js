const FuelCombution = require("../../../Domain/Entities/fuelcombution");

class FuelCombutionRepository {
  
  async getScope1DataByDateRange(startDate, endDate, company_id) {
    return await FuelCombution.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      companyId: company_id, 
    }).lean();
  }

  async create(data) {
    const fuelCombution = new FuelCombution(data);
    return await fuelCombution.save();
  }

  async findAll(criteria = {}) {
    return await FuelCombution.find(criteria);
  }

  async findFuelById(criteria) {
    return await FuelCombution.find({companyId:criteria});
  }

  async findOne(criteria) {
    return await FuelCombution.findOne(criteria);
  }

  async findById(id) {
    return await FuelCombution.findById(id);
  }

  async update(id, data) {
    return await FuelCombution.findByIdAndUpdate(id, data, { new: true });
  }
}

module.exports = new FuelCombutionRepository();
