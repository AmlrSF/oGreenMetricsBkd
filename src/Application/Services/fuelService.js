const fuelcombutionRepo = require('../../Infrastructure/Repositories/fuelcombutionRepo');
const productionRepo = require('../../Infrastructure/Repositories/productionRepo');

// Emission factors (in kg CO2 per unit)
const EMISSION_FACTORS = {
  "Natural Gas": 0.20196, // kg CO2/kWh
  "Diesel": 0.26676, // kg CO2/liter
  "Gasoline": 0.24948, // kg CO2/liter
  "Coal": 0.4032, // kg CO2/kg
};

class FuelService {
  constructor(fuelcombutionRepo, productionRepo) {
    this.fuelcombutionRepo = fuelcombutionRepo;
    this.productionRepo = productionRepo;
  }

  async addFuelCombution(data, companyId) {
    const { machines } = data;
    if (!machines || !Array.isArray(machines) || machines.length === 0) {
      throw new Error("Machines array is required and must not be empty");
    }

    const machine = machines[0]; // Single machine per request
    const emissionFactor = EMISSION_FACTORS[machine.typeDeCarburant] || 0;
    const co2Emission = machine.quantite * emissionFactor;

    // Prepare the machine with calculated values
    const updatedMachine = {
      ...machine,
      co2Emission: co2Emission,
      emissionFactor: emissionFactor,
    };

    // Find the existing record for this company
    let existingRecord = await this.fuelcombutionRepo.findOne({ companyId });
    if (existingRecord) {
      // Append the new machine to the existing record
      existingRecord.machines.push(updatedMachine);
      // Recalculate totalEmissions
      existingRecord.totalEmissions = existingRecord.machines.reduce(
        (sum, machine) => sum + machine.co2Emission,
        0
      );
      return await this.fuelcombutionRepo.update(existingRecord._id, {
        machines: existingRecord.machines,
        totalEmissions: existingRecord.totalEmissions,
      });
    } else {
      // Create a new record if none exists for this company
      const newData = {
        machines: [updatedMachine],
        totalEmissions: co2Emission,
        companyId
      };
      return await this.fuelcombutionRepo.create(newData);
    }
  }

  async getFuelCombutions(companyId) {
    const records = await this.fuelcombutionRepo.findOne({ companyId });
    return records ? [records] : [];
  }

  async addProduction(data, companyId) {
    const { products } = data;
    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new Error("Products array is required and must not be empty");
    }

    const product = products[0]; // Single product per request
    // For now, products don't have typeDeCarburant; if needed, add it
    const emissionFactor = 0; // Default to 0 since no fuel type is provided
    const co2Emission = product.quantite * emissionFactor;

    const updatedProduct = {
      ...product,
      co2Emission: co2Emission,
      emissionFactor: emissionFactor,
    };

    // Find the existing record for this company
    let existingRecord = await this.productionRepo.findOne({ companyId });
    if (existingRecord) {
      existingRecord.products.push(updatedProduct);
      existingRecord.totalEmissions = existingRecord.products.reduce(
        (sum, product) => sum + product.co2Emission,
        0
      );
      return await this.productionRepo.update(existingRecord._id, {
        products: existingRecord.products,
        totalEmissions: existingRecord.totalEmissions,
      });
    } else {
      const newData = {
        products: [updatedProduct],
        totalEmissions: co2Emission,
        companyId
      };
      return await this.productionRepo.create(newData);
    }
  }

  async getProductions(companyId) {
    const records = await this.productionRepo.findOne({ companyId });
    return records ? [records] : [];
  }
  async deleteFuelCombution(machineId, companyId) {
  const record = await this.fuelcombutionRepo.findOne({ companyId });
  if (!record) {
    throw new Error("Record not found");
  }
  
  // Convert both to strings and use strict comparison
  const machineIndex = record.machines.findIndex(m => String(m._id) === String(machineId));
  if (machineIndex === -1) {
    throw new Error("Machine not found");
  }
  
  // Remove the machine
  record.machines.splice(machineIndex, 1);
  
  // Recalculate totalEmissions
  record.totalEmissions = record.machines.reduce(
    (sum, machine) => sum + (machine.co2Emission || 0), 0);
  
  return await this.fuelcombutionRepo.update(record._id, {
    machines: record.machines,
    totalEmissions: record.totalEmissions,
  });
}
  
  async deleteProduction(productId, companyId) {
    const record = await this.productionRepo.findOne({ companyId });
    if (!record) {
      throw new Error("Record not found");
    }
    
    const productIndex = record.products.findIndex(p => p._id.toString() === productId);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    
    // Remove the product
    record.products.splice(productIndex, 1);
    
    // Recalculate totalEmissions
    record.totalEmissions = record.products.reduce(
      (sum, product) => sum + product.co2Emission, 0);
    
    return await this.productionRepo.update(record._id, {
      products: record.products,
      totalEmissions: record.totalEmissions,
    });
  }
  
  async updateFuelCombution(machineId, updatedMachine, companyId) {
    const record = await this.fuelcombutionRepo.findOne({ companyId });
    if (!record) {
      throw new Error("Record not found");
    }
    
    const machineIndex = record.machines.findIndex(m => m._id.toString() === machineId);
    if (machineIndex === -1) {
      throw new Error("Machine not found");
    }
    
    // Calculate emissions
    const emissionFactor = EMISSION_FACTORS[updatedMachine.typeDeCarburant] || 0;
    const co2Emission = updatedMachine.quantite * emissionFactor;
    
    // Update the machine
    const newMachine = {
      ...record.machines[machineIndex],
      ...updatedMachine,
      co2Emission: co2Emission,
      emissionFactor: emissionFactor
    };
    
    record.machines[machineIndex] = newMachine;
    
    // Recalculate totalEmissions
    record.totalEmissions = record.machines.reduce(
      (sum, machine) => sum + machine.co2Emission, 0);
    
    return await this.fuelcombutionRepo.update(record._id, {
      machines: record.machines,
      totalEmissions: record.totalEmissions,
    });
  }
  
  async updateProduction(productId, updatedProduct, companyId) {
    const record = await this.productionRepo.findOne({ companyId });
    if (!record) {
      throw new Error("Record not found");
    }
    
    const productIndex = record.products.findIndex(p => p._id.toString() === productId);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    
    // For now, assuming no emissions calculation needed for products
    const emissionFactor = 0;
    const co2Emission = updatedProduct.quantite * emissionFactor;
    
    // Update the product
    const newProduct = {
      ...record.products[productIndex],
      ...updatedProduct,
      co2Emission: co2Emission,
      emissionFactor: emissionFactor
    };
    
    record.products[productIndex] = newProduct;
    
    // Recalculate totalEmissions
    record.totalEmissions = record.products.reduce(
      (sum, product) => sum + product.co2Emission, 0);
    
    return await this.productionRepo.update(record._id, {
      products: record.products,
      totalEmissions: record.totalEmissions,
    });
  }
}

module.exports = new FuelService(fuelcombutionRepo, productionRepo);