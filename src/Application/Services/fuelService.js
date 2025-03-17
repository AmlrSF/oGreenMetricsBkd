const fuelcombutionRepo = require('../../Infrastructure/Repositories/fuelcombutionRepo');
const productionRepo = require('../../Infrastructure/Repositories/productionRepo');

class FuelService {
  constructor(fuelcombutionRepo, productionRepo) {
    this.fuelcombutionRepo = fuelcombutionRepo;
    this.productionRepo = productionRepo;
  }

  async addFuelCombution(data) { 
    let existingRecord = await this.fuelcombutionRepo.findOne({});  
    if (existingRecord) { 
      existingRecord.machines.push(data.machines[0]);
      existingRecord.totalEmissions = existingRecord.machines.reduce((sum, machine) => sum + machine.co2Emission, 0);
      return await existingRecord.save();
    } else { 
      return await this.fuelcombutionRepo.create(data);
    }
  }

  async getFuelCombutions() {
    return await this.fuelcombutionRepo.findAll();
  }

  async addProduction(data) {
    let existingRecord = await this.productionRepo.findOne({});
    if (existingRecord) {
      existingRecord.products.push(data.products[0]);
      existingRecord.totalEmissions = existingRecord.products.reduce((sum, product) => sum + product.co2Emission, 0);
      return await existingRecord.save();
    } else {
      return await this.productionRepo.create(data);
    }
  }

  async getProductions() {
    return await this.productionRepo.findAll();
  }
}

module.exports = new FuelService(fuelcombutionRepo, productionRepo);