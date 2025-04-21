require("dotenv").config();
const EmployesTransport = require("../../../Domain/Entities/scope3/EmployesTransport"); // Adjust path as needed

class EmployesTransportRepo {
  async getScope3DataByDateRange(startDate, endDate, company_id) {
    return await EmployesTransport.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      company_id: company_id,
    }).lean();
  }

  async getAllEmployesTransports() {
    return await EmployesTransport.find().lean();
  }

  async getEmployesTransportByCompanyId(company_id) {
    return await EmployesTransport.find({ company_id: company_id }).lean();
  }

  async createEmployesTransport(data) {
    const newRecord = new EmployesTransport({
      depart: data.depart,
      destination: data.destination,
      distance: data.distance,
      nombreEmployes: data.nombreEmployes,
      mode: data.mode,
      nomBus: data.nomBus,
      matricule: data.matricule,
      company_id: data.company_id,
      scopeType: data.scopeType,
      emissionFactor: data.emissionFactor,
      emissions: data.emissions,
    });

    await newRecord.save();
    return newRecord;
  }

  async updateEmployesTransport(id, updateData) {
    const updated = await EmployesTransport.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updated) {
      throw new Error("EmployesTransport not found");
    }
    return updated;
  }

  async deleteEmployesTransport(id) {
    const result = await EmployesTransport.findByIdAndDelete(id);
    if (!result) {
      throw new Error("EmployesTransport not found");
    }
    return result;
  }
}

module.exports = EmployesTransportRepo;
