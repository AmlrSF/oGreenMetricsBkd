// fuelcombutionRepo.js
const FuelCombution = require('../../Domain/Entities/fuelcombution');

class FuelCombutionRepository {
  async create(data) {
    const fuelCombution = new FuelCombution(data);
    return await fuelCombution.save();
  }

  async findAll() {
    return await FuelCombution.find();
  }

  async findOne(criteria) {
    return await FuelCombution.findOne(criteria);
  }

  async findById(id) {
    return await FuelCombution.findById(id);
  }
}

module.exports = new FuelCombutionRepository();
