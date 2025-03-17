const Production = require('../../Domain/Entities/production');

class ProductionRepository {
  async create(data) {
    const production = new Production(data);
    return await production.save();
  }

  async findAll() {
    return await Production.find();
  }

  async findOne(criteria) {
    return await Production.findOne(criteria);
  }

  async findById(id) {
    return await Production.findById(id);
  }
}

module.exports = new ProductionRepository();