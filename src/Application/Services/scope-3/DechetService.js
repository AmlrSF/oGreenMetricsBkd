class DechetService {
  constructor(dechetRepository) {
    this.dechetRepository = dechetRepository;
  }

  async getAllDechets() {
    return await this.dechetRepository.getAllDechets();
  }

  async getDechetById(id) {
    return await this.dechetRepository.getDechetById(id);
  }

  async createDechet(dechetObj) {
    let emissionFactor = "0";

    switch (dechetObj.methode) {
      case "Landfill":
        emissionFactor = "0.586"; // Emission factor for landfill
        break;
      case "Recycling":
        emissionFactor = "0.021"; // Emission factor for recycling
        break;
      default:
        throw new Error("Unknown disposal method");
    }

    const poids = parseFloat(dechetObj.poids) || 0;
    const emissions = (parseFloat(emissionFactor) * poids).toFixed(3);

    const Dechet = {
      ...dechetObj,
      emissionFactor,
      emissions: emissions.toString(),
    };
    return await this.dechetRepository.createDechet(Dechet);
  }

  async updateDechet(id, updateData) {
    let emissionFactor = "0";

    switch (updateData.methode) {
      case "Landfill":
        emissionFactor = "0.586";
        break;
      case "Recycling":
        emissionFactor = "0.021";
        break;
      default:
        throw new Error("Unknown disposal method");
    }

    const poids = parseFloat(updateData.poids) || 0;
    const emissions = (parseFloat(emissionFactor) * poids).toFixed(3);

    const DechetUpdated = {
      ...updateData,
      emissionFactor,
      emissions: emissions.toString(),
    };
    return await this.dechetRepository.updateDechet(id, DechetUpdated);
  }

  async deleteDechet(id) {
    return await this.dechetRepository.deleteDechet(id);
  }
}

module.exports = DechetService;
