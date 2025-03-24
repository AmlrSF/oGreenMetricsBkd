class TransportService {
  constructor(transportRepository) {
    this.transportRepository = transportRepository;
  }

  async getAllTransports() {
    return await this.transportRepository.getAllTransports();
  }

  async getTransportById(id) {
    return await this.transportRepository.getTransportById(id);
  }

  async createTransport(transportObj) {
    let emissionFactor = "0";

    switch (transportObj.mode) {
      case "Land":
        emissionFactor = "0.10665"; // Road transport emissions per km
        break;
      case "Sea":
        emissionFactor = "0.01614"; // Sea transport emissions per km
        break;
      case "Air":
        emissionFactor = "0.59943"; // Freight flight emissions per km
        break;
      case "Rail":
        emissionFactor = "0.02556"; // Rail transport emissions per km
        break;
      default:
        throw new Error("Unknown transport type");
    }

    const poids = parseFloat(transportObj.poids) || 0;
    const distance = parseFloat(transportObj.distance) || 0;
    const emissions = (parseFloat(emissionFactor) * poids * distance).toFixed(
      2
    );

    const Transport = {
      ...transportObj,
      emissionFactor,
      emissions: emissions.toString(),
    };
    return await this.transportRepository.createTransport(Transport);
  }

  async updateTransport(id, updateData) {
    let emissionFactor = "0";

    switch (updateData.mode) {
      case "Land":
        emissionFactor = "0.10665"; // Road transport emissions per km
        break;
      case "Sea":
        emissionFactor = "0.01614"; // Sea transport emissions per km
        break;
      case "Air":
        emissionFactor = "0.59943"; // Freight flight emissions per km
        break;
      case "Rail":
        emissionFactor = "0.02556"; // Rail transport emissions per km
        break;
      default:
        throw new Error("Unknown transport type");
    }

    const poids = parseFloat(updateData.poids) || 0;
    const distance = parseFloat(updateData.distance) || 0;
    const emissions = (parseFloat(emissionFactor) * poids * distance).toFixed(
      5
    );

    const TransportUpdated = {
      ...updateData,
      emissionFactor,
      emissions: emissions.toString(),
    };
    return await this.transportRepository.updateTransport(id, TransportUpdated);
  }

  async deleteTransport(id) {
    return await this.transportRepository.deleteTransport(id);
  }
}

module.exports = TransportService;
