const Production = require("../../../Domain/Entities/production");

class ProductionRepository {
  
  async getScope1DataByDateRange(startDate, endDate, company_id) {
    return await Production.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      companyId: company_id,
    }).lean();
  }

  async create(data) {
    const production = new Production(data);
    return await production.save();
  }

  async findAll(criteria = {}) {
    return await Production.find(criteria);
  }

  async getproductionbyID(company_id){
    return await Production.find({companyId:company_id})
  }

  async findOne(criteria) {
    return await Production.findOne(criteria);
  }

  async findById(id) {
    return await Production.findById(id);
  }

  async update(id, data) {
    return await Production.findByIdAndUpdate(id, data, { new: true });
  }
}

module.exports = new ProductionRepository();
