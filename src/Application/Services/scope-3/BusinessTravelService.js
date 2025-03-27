class BusinessTravelService {
  constructor(businessTravelRepository) {
    this.businessTravelRepository = businessTravelRepository;
  }

  async getAllBusinessTravels() {
    return await this.businessTravelRepository.getAllBusinessTravels();
  }

  async getBusinessTravelByCompanyId(company_id) {
    return await this.businessTravelRepository.getBusinessTravelByCompanyId(
      company_id
    );
  }

  async createBusinessTravel(businessTravelObj) {
    let emissionFactor = 0;
 
    

    switch (businessTravelObj.type) {
      case "Short-haul":
        emissionFactor = 0.156;
        break;
      case "Long-haul":
        emissionFactor = 0.11;
        break;
      case "Car":
        emissionFactor = 0.17;
        break;
      case "Train":
        emissionFactor = 0.004;
        break;
      default:
        throw new Error("Unknown business travel mode");
    }

    const distance = parseFloat(businessTravelObj.distance) || 0;
    const emissions = (distance * emissionFactor).toFixed(2);

    const businessTravel = {
      ...businessTravelObj,
      emissionFactor: emissionFactor.toString(),
      emissions: emissions.toString(),
    };
    return await this.businessTravelRepository.createBusinessTravel(
      businessTravel
    );
  }

  async updateBusinessTravel(id, updateData) {
    let emissionFactor = 0;

    switch (updateData.type) {
      case "Short-haul":
        emissionFactor = 0.156;
        break;
      case "Long-haul":
        emissionFactor = 0.11;
        break;
      case "Car":
        emissionFactor = 0.17;
        break;
      case "Train":
        emissionFactor = 0.004;
        break;
      default:
        throw new Error("Unknown business travel mode");
    }

    const distance = parseFloat(updateData.distance) || 0;
    const emissions = (distance * emissionFactor).toFixed(2);

    const businessTravelUpdated = {
      ...updateData,
      emissionFactor: emissionFactor.toString(),
      emissions: emissions.toString(),
    };
    return await this.businessTravelRepository.updateBusinessTravel(
      id,
      businessTravelUpdated
    );
  }

  async deleteBusinessTravel(id) {
    return await this.businessTravelRepository.deleteBusinessTravel(id);
  }
}

module.exports = BusinessTravelService;
