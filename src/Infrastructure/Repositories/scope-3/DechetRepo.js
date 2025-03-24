require("dotenv").config();
const Dechet = require("../../../Domain/Entities/scope3/Dechets"); // Ensure this path is correct

class DechetRepo {
  async getAllDechets() {
    return await Dechet.find().lean();
  }

  async getDechetById(company_id) {
    return await Dechet.find({ company_id }).lean();
  }

  async createDechet(dechetData) {
    console.log(dechetData);

    const newDechet = new Dechet({
      name: dechetData.name,
      type: dechetData.type,
      poids: dechetData.poids,
      methode: dechetData.methode,
      scopeType: dechetData.scopeType,
      emissionFactor: dechetData.emissionFactor,
      emissions: dechetData.emissions,
      company_id: dechetData.company_id,
    });

    await newDechet.save();
    return newDechet;
  }

  async updateDechet(dechetId, updateData) {
    const updatedDechet = await Dechet.findByIdAndUpdate(
      dechetId,
      { $set: updateData },
      { new: true }
    );
    if (!updatedDechet) throw new Error("Dechet not found");
    return updatedDechet;
  }

  async deleteDechet(dechetId) {
    const result = await Dechet.findByIdAndDelete(dechetId);
    if (!result) throw new Error("Dechet not found");
    return result;
  }
}

module.exports = DechetRepo;
