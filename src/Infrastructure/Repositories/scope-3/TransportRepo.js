require("dotenv").config();
const Transport = require("../../../Domain/Entities/scope3/Transport"); // Ensure this path is correct

class TransportRepo {
  async getAllTransports() {
    const transportsData = await Transport.find().lean();
    return transportsData;
  }

  async getTransportById(company_id) {
    const transport = await Transport.find({ company_id: company_id })
      .lean();

    
    return transport;
  }

  async createTransport(transportData) {
    console.log(transportData);

    const newTransport = new Transport({
      purpose: transportData.purpose,
      distance: transportData.distance,
      poids: transportData.poids,
      mode: transportData.mode,
      type: transportData.type,
      company_id: transportData.company_id,
      scopeType: transportData.scopeType,
      emissionFactor: transportData.emissionFactor,
      emissions: transportData.emissions,
    });

    await newTransport.save();
    return newTransport;
  }

  async updateTransport(transportId, updateData) {
    const updatedTransport = await Transport.findByIdAndUpdate(
      transportId,
      { $set: updateData },
      { new: true }
    );
    if (!updatedTransport) {
      throw new Error("Transport not found");
    }
    return updatedTransport;
  }

  async deleteTransport(transportId) {
    const result = await Transport.findByIdAndDelete(transportId);
    if (!result) {
      throw new Error("Transport not found");
    }
    return result;
  }
}

module.exports = TransportRepo;
