const fuelcombutionRepo = require('../../../Infrastructure/Repositories/scope1/fuelcombutionRepo');

const EMISSION_FACTORS = {
  "Natural Gas": 0.20196,
  "Diesel": 0.26676,
  "Gasoline": 0.24948,
  "Coal": 0.4032,
};

class FuelCombustionService {
  constructor(fuelcombutionRepo) {
    this.fuelcombutionRepo = fuelcombutionRepo;
  }

  async addFuelCombution(data, companyId) {
    const { machines } = data;
    if (!machines || !Array.isArray(machines) || machines.length === 0) {
      throw new Error("Machines array is required and must not be empty");
    }

    const machine = machines[0];
    const emissionFactor = EMISSION_FACTORS[machine.typeDeCarburant] || 0;
    const co2Emission = machine.quantite * emissionFactor;

    const updatedMachine = {
      ...machine,
      co2Emission,
      emissionFactor,
    };

    let existingRecord = await this.fuelcombutionRepo.findOne({ companyId });
    if (existingRecord) {
      existingRecord.machines.push(updatedMachine);
      existingRecord.totalEmissions = existingRecord.machines.reduce(
        (sum, machine) => sum + machine.co2Emission,
        0
      );
      return await this.fuelcombutionRepo.update(existingRecord._id, {
        machines: existingRecord.machines,
        totalEmissions: existingRecord.totalEmissions,
      });
    } else {
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

  async deleteFuelCombution(machineId, companyId) {
    const record = await this.fuelcombutionRepo.findOne({ companyId });
    if (!record) throw new Error("Record not found");

    const machineIndex = record.machines.findIndex(m => String(m._id) === String(machineId));
    if (machineIndex === -1) throw new Error("Machine not found");

    record.machines.splice(machineIndex, 1);
    record.totalEmissions = record.machines.reduce(
      (sum, machine) => sum + (machine.co2Emission || 0),
      0
    );

    return await this.fuelcombutionRepo.update(record._id, {
      machines: record.machines,
      totalEmissions: record.totalEmissions,
    });
  }

  async updateFuelCombution(machineId, updatedMachine, companyId) {
    const record = await this.fuelcombutionRepo.findOne({ companyId });
    if (!record) throw new Error("Record not found");

    const machineIndex = record.machines.findIndex(m => m._id.toString() === machineId);
    if (machineIndex === -1) throw new Error("Machine not found");

    const emissionFactor = EMISSION_FACTORS[updatedMachine.typeDeCarburant] || 0;
    const co2Emission = updatedMachine.quantite * emissionFactor;

    const newMachine = {
      ...record.machines[machineIndex],
      ...updatedMachine,
      co2Emission,
      emissionFactor
    };

    record.machines[machineIndex] = newMachine;
    record.totalEmissions = record.machines.reduce(
      (sum, machine) => sum + machine.co2Emission,
      0
    );

    return await this.fuelcombutionRepo.update(record._id, {
      machines: record.machines,
      totalEmissions: record.totalEmissions,
    });
  }
}

module.exports = new FuelCombustionService(fuelcombutionRepo);