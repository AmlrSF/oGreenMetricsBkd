class CapitalGoodsAndServiceService {
  constructor(PurchasedGoodsAndServicesRepository) {
    this.PurchasedGoodsAndServicesRepository =
      PurchasedGoodsAndServicesRepository;
  }

  // Get all capital goods and services
  async getAllCapitalGoodsAndServices() {
    return await this.PurchasedGoodsAndServicesRepository.getAll();
  }

  // Get capital good or service by ID
  async getCapitalGoodById(id) {
    //console.log(id);
    
    return await this.PurchasedGoodsAndServicesRepository.getByCompanyId(id);
  }

  // Create a new capital good or service with calculated emissions
  async createCapitalGoodAndService(data) {
    const emissionFactor = this.getEmissionFactor(data.type, data.sousType);
    const quantity = parseFloat(data.quantite) || 0;
    const emissions = (quantity * emissionFactor).toFixed(3);

    const capitalGoodAndService = {
      ...data,
      emissionFactor,
      emissions: emissions.toString(),
    };

    return await this.PurchasedGoodsAndServicesRepository.create(
      capitalGoodAndService
    );
  }

  // Update an existing capital good or service
  async updateCapitalGoodAndService(id, updateData) {
    const emissionFactor = this.getEmissionFactor(
      updateData.type,
      updateData.sousType
    );
    const quantity = parseFloat(updateData.quantite) || 0;
    const emissions = (quantity * emissionFactor).toFixed(3);

    const capitalGoodAndServiceUpdated = {
      ...updateData,
      emissionFactor,
      emissions: emissions.toString(),
    };

    return await this.PurchasedGoodsAndServicesRepository.update(
      id,
      capitalGoodAndServiceUpdated
    );
  }

  // Delete a capital good or service
  async deleteCapitalGoodAndService(id) {
    return await this.PurchasedGoodsAndServicesRepository.delete(id);
  }

  // Get emission factor based on type and sousType
  getEmissionFactor(type, sousType) {
    const emissionFactors = {
      MineralIndustry: {
        Cement: 0.43971,
        Lime: 0.86,
        Glass: 0.5347,
      },
      ChemicalIndustry: {
        Ammonia: 36.2,
        SodaAsh: 0.138,
        Carbide: 1.09,
      },
      MetalIndustry: {
        IronSteel: 1.83,
        Magnesium: 13.95,
        Lead: 0.19,
        Zinc: 2.62,
      },
      Buildings: {
        NaturalGas: 0.202,
        OilHeating: 0.267,
        CommercialOps: 0.255,
      },
      Agriculture: {
        Rice: 1.45,
        Fertilizer: 4.6,
        Soil: 1.9,
      },
      WasteSector: {
        MunicipalWaste: 0.586,
        Wastewater: 0.00023, // 0.23 kg = 0.00023 tonnes
        Composting: 0.172,
        Incineration: 0.415,
      },
      EUImporters: {
        Cement: 0.766,
        IronSteel: 1.328,
        Aluminum: 1.514,
        Fertilizer: 1.882,
      },
      Service: {
        Service: 0.4, // Set to 0 or appropriate value
      },
    };

    if (emissionFactors[type] && emissionFactors[type][sousType]) {
      return emissionFactors[type][sousType];
    } else {
      throw new Error(
        `Unknown emission factor for type: ${type}, sousType: ${sousType}`
      );
    }
  }
}

module.exports = CapitalGoodsAndServiceService;
