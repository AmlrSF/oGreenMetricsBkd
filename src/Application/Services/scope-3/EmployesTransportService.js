class EmployesTransportService {
  constructor(employesTransportRepository) {
    this.employesTransportRepository = employesTransportRepository;
  }

  async getAllEmployesTransports() {
    return await this.employesTransportRepository.getAllEmployesTransports();
  }

  async getEmployesTransportByCompanyId(company_id) {
    return await this.employesTransportRepository.getEmployesTransportByCompanyId(
      company_id
    );
  }

  async createEmployesTransport(data) {
    let emissionFactor = "0";
    switch (data.mode) {
      case "Train":
        emissionFactor = "0.10665";
        break;
      case "Bus":
        emissionFactor = "0.59943";
        break;
      default:
        throw new Error("Unknown transport mode");
    }

    const nombreEmployes = parseFloat(data.nombreEmployes) || 0;
    const distance = parseFloat(data.distance) || 0;
    const emissions = (
      parseFloat(emissionFactor) *
      nombreEmployes *
      distance
    ).toFixed(2);

    const transportData = {
      ...data,
      emissionFactor,
      emissions: emissions.toString(),
    };

    return await this.employesTransportRepository.createEmployesTransport(
      transportData
    );
  }

  async updateEmployesTransport(id, updateData) {
    let emissionFactor = "0";

    switch (updateData.mode) {
      case "Train":
        emissionFactor = "0.10665";
        break;
      case "Bus":
        emissionFactor = "0.59943";
        break;
      default:
        throw new Error("Unknown transport mode");
    }

    const nombreEmployes = parseFloat(updateData.nombreEmployes) || 0;
    const distance = parseFloat(updateData.distance) || 0;
    const emissions = (
      parseFloat(emissionFactor) *
      nombreEmployes *
      distance
    ).toFixed(2);

    const updatedData = {
      ...updateData,
      emissionFactor,
      emissions: emissions.toString(),
    };

    return await this.employesTransportRepository.updateEmployesTransport(
      id,
      updatedData
    );
  }

  async deleteEmployesTransport(id) {
    return await this.employesTransportRepository.deleteEmployesTransport(id);
  }
}

module.exports = EmployesTransportService;
