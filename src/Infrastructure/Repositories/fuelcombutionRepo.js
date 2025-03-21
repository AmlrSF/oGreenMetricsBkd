const FuelCombution = require('../../Domain/Entities/fuelcombution');

class FuelCombutionRepository {
  async create(data) {
    const fuelCombution = new FuelCombution(data);
    return await fuelCombution.save();
  }

  async findAll(criteria = {}) {
    return await FuelCombution.find(criteria);
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
