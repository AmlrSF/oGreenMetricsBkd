const FuelRepo = require("../../../Infrastructure/Repositories/fuelcombutionRepo");
const productionRepo = require("../../../Infrastructure/Repositories/productionRepo");

const HeatingRepo = require("../../../Infrastructure/Repositories/heatingRepo");
const CoolingRepo = require("../../../Infrastructure/Repositories/coolingRepo");
const EnergyRepo = require("../../../Infrastructure/Repositories/energyConsumptionRepo");

const TransportRepo = require("../../../Infrastructure/Repositories/scope-3/TransportRepo");
const DechetRepo = require("../../../Infrastructure/Repositories/scope-3/DechetRepo");
const CapitalGoodRepo = require("../../../Infrastructure/Repositories/scope-3/CapitalGoodRepo");
const buisnessTravelRepo = require("../../../Infrastructure/Repositories/scope-3/BusinessTravelRepo");

class ReportService {
  constructor(reportRepository) {
    this.reportRepository = reportRepository;
  }

  async getAllReports(company_id) {
    return await this.reportRepository.getAllReports(company_id);
  }

  async getReportById(reportId) {
    return await this.reportRepository.getReportById(reportId);
  }

  
  async createReport(reportData) {
    const { scope1, scope2, scope3, Year, company_id } = reportData;
    console.log(reportData);
    
  
    let scope1Data = {};
    let scope2Data = {};
    let scope3Data = {};
    //console.log(Year);
    
  

    const isInYear = (item) => {
      const created = new Date(item.createdAt);
      const itemYear = created.getFullYear();
      //console.log("item Year: ", itemYear, itemYear == Year);
      return itemYear == Year;
    };
  
    if (scope1) {
      const fuelData = await FuelRepo.findFuelById(company_id);
      const productionData = await productionRepo.getproductionbyID(company_id);
  
      // console.log('-------------------scope 1---------------------------');
      // console.log(fuelData, productionData);
  
      scope1Data = {
        fuelCombution: fuelData.filter(isInYear).map((item) => item._id),
        production: productionData.filter(isInYear).map((item) => item._id),
      };
    }
  
    if (scope2) {
      const heat = new HeatingRepo();
      const cool = new CoolingRepo();
      const energy = new EnergyRepo();
  
      const Heating = await heat.getHeatByid(company_id);
      const Cooling = await cool.getCoolById(company_id);
      const Energy = await energy.getEnergyByCompanyId(company_id);
  
      // console.log('---------------------scope2-------------------------');
      // console.log(Heating, Cooling, Energy);
  
      scope2Data = {
        heating: Heating.filter(isInYear).map((item) => item._id),
        cooling: Cooling.filter(isInYear).map((item) => item._id),
        energyConsumption: Energy.filter(isInYear).map((item) => item._id),
      };
    }
  
    if (scope3) {
      const transport = new TransportRepo();
      const dechet = new DechetRepo();
      const capitalGood = new CapitalGoodRepo();
      const business = new buisnessTravelRepo();
  
      const Transport = await transport.getTransportById(company_id);
      const Dechet = await dechet.getDechetById(company_id);
      const CapitalGood = await capitalGood.getCapitalGoodByCompanyId(company_id);
      const BusinessTravel = await business.getBusinessTravelByCompanyId(company_id);
  
      // console.log('---------------------scope3-------------------------');
      // console.log(Transport, Dechet, CapitalGood, BusinessTravel);
  
      scope3Data = {
        transport: Transport.filter(isInYear).map((item) => item._id),
        dechet: Dechet.filter(isInYear).map((item) => item._id),
        capitalGood: CapitalGood.filter(isInYear).map((item) => item._id),
        businessTravel: BusinessTravel.filter(isInYear).map((item) => item._id),
      };
    }
  
    const newReport = {
      ...reportData,
      scope1Data,
      scope2Data,
      scope3Data,
    };
  
    return await this.reportRepository.createReport(newReport);
  }
  

  async updateReport(reportId, updateData) {
    return await this.reportRepository.updateReport(reportId, updateData);
  }

  async deleteReport(reportId) {
    return await this.reportRepository.deleteReport(reportId);
  }
}

module.exports = ReportService;
