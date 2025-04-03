const FuelRepo = require("../../../Infrastructure/Repositories/fuelcombutionRepo");
const productionRepo = require("../../../Infrastructure/Repositories/productionRepo");

const HeatingRepo = require("../../../Infrastructure/Repositories/heatingRepo");
const CoolingRepo = require("../../../Infrastructure/Repositories/coolingRepo");
const EnergyRepo = require("../../../Infrastructure/Repositories/energyConsumptionRepo");

const TransportRepo = require("../../../Infrastructure/Repositories/scope-3/TransportRepo");
const DechetRepo = require("../../../Infrastructure/Repositories/scope-3/DechetRepo");
const CapitalGoodRepo = require("../../../Infrastructure/Repositories/scope-3/CapitalGoodRepo");
const buisnessTravel = require("../../../Infrastructure/Repositories/scope-3/CapitalGoodRepo");

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
    const { scope1, scope2, scope3, startDate, endDate, company_id } = reportData;

    let scope1Data = [];
    let scope2Data = [];
    let scope3Data = [];

   
    console.log(company_id)
    

    if (scope1) {
      const fuelData = await FuelRepo.getScope1DataByDateRange(
        startDate,
        endDate,
        company_id
      );
      
      const productionData = await productionRepo.getScope1DataByDateRange(
        startDate,
        endDate,
        company_id
      );
      
      scope1Data = [
        ...fuelData.map((item) => ({
          schemaType: "FuelCombution",
          refId: item._id,
        })),
        ...productionData.map((item) => ({
          schemaType: "Production",
          refId: item._id,
        })),
      ];
    }

    if(scope2){
      const heat = new HeatingRepo();
      const cool = new CoolingRepo();
      const energy = new EnergyRepo();

      const Heating = await heat.getScope2DataByDateRange(
        startDate,
        endDate,
        company_id
      );
      const Cooling = await cool.getScope2DataByDateRange(
        startDate,
        endDate,
        company_id
      );
      const Energy = await energy.getScope2DataByDateRange(
        startDate,
        endDate,
        company_id
      );

      scope1Data = [
        ...Heating.map((item) => ({
          schemaType: "Heating",
          refId: item._id,
        })),
        ...Energy.map((item) => ({
          schemaType: "EnergyConsumption",
          refId: item._id,
        })),
        ...Cooling.map((item) => ({
          schemaType: "Cooling",
          refId: item._id,
        })),
      ];
    }

    if(scope3){
      const transportRepo = new TransportRepo();
      const dechetRepo = new DechetRepo();
      const capitalGoodRepo = new CapitalGoodRepo();
      const businessTravelRepo = new buisnessTravel();

      const transportData = await transportRepo.getScope3DataByDateRange(startDate, endDate, company_id);
      const dechetData = await dechetRepo.getScope3DataByDateRange(startDate, endDate, company_id);
      const capitalGoodData = await capitalGoodRepo.getScope3DataByDateRange(startDate, endDate, company_id);
      const businessTravelData = await businessTravelRepo.getScope3DataByDateRange(startDate, endDate, company_id);

      scope3Data = [
        ...transportData.map(item => ({ schemaType: "Transport", refId: item._id })),
        ...dechetData.map(item => ({ schemaType: "Dechet", refId: item._id })),
        ...capitalGoodData.map(item => ({ schemaType: "CapitalGood", refId: item._id })),
        ...businessTravelData.map(item => ({ schemaType: "BusinessTravel", refId: item._id }))
      ];
    }

    const newReport = {
      ...reportData,
      scope1Data,
      scope2Data,
      scope3Data,
      status: "pending",
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
