class CapitalGoodService {
  constructor(capitalGoodRepository) {
    this.capitalGoodRepository = capitalGoodRepository;
  }

  async getAllCapitalGoods() {
    return await this.capitalGoodRepository.getAllCapitalGoods();
  }

  async getCapitalGoodByCompanyId(company_id) {
    return await this.capitalGoodRepository.getCapitalGoodByCompanyId(
      company_id
    );
  }

  async createCapitalGood(capitalGoodObj) {
    let emissionFactor = "0";

    switch (capitalGoodObj.category) {
      case "Manufacturing Equipment":
        emissionFactor = "2.54"; 
        break;
      case "IT Equipment":
        emissionFactor = "1.87";
        break;
      case "Vehicles":
        emissionFactor = "3.12";
        break;
      case "Buildings":
        emissionFactor = "4.23";
        break;
      default:
        throw new Error("Unknown capital good category");
    }

    const purchaseCost = parseFloat(capitalGoodObj.cost) || 0;
    const emissions = (parseFloat(emissionFactor) * purchaseCost).toFixed(3);

    const CapitalGood = {
      ...capitalGoodObj,
      emissionFactor,
      emissions: emissions.toString(),
    };

    

    return await this.capitalGoodRepository.createCapitalGood(CapitalGood);
  }

  async updateCapitalGood(id, updateData) {
    let emissionFactor = "0";

    switch (updateData.category) {
      case "Manufacturing Equipment":
        emissionFactor = "2.54";
        break;
      case "IT Equipment":
        emissionFactor = "1.87";
        break;
      case "Vehicles":
        emissionFactor = "3.12";
        break;
      case "Buildings":
        emissionFactor = "4.23";
        break;
      default:
        throw new Error("Unknown capital good category");
    }

    const purchaseCost = parseFloat(updateData.cost) || 0;
    const emissions = (parseFloat(emissionFactor) * purchaseCost).toFixed(3);

    const CapitalGoodUpdated = {
      ...updateData,
      emissionFactor,
      emissions: emissions.toString(),
    };

    return await this.capitalGoodRepository.updateCapitalGood(
      id,
      CapitalGoodUpdated
    );

  }

  async deleteCapitalGood(id) {
    return await this.capitalGoodRepository.deleteCapitalGood(id);
  }
}

module.exports = CapitalGoodService;
