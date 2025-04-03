require("dotenv").config();
const BusinessTravel = require("../../../Domain/Entities/scope3/buisnessTravel");

class BusinessTravelRepo {
  async getScope3DataByDateRange(startDate, endDate, company_id) {
    return await BusinessTravel.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      company_id: company_id,
    }).lean();
  }

  async getAllBusinessTravels() {
    const businessTravelsData = await BusinessTravel.find().lean();
    return businessTravelsData;
  }

  async getBusinessTravelByCompanyId(company_id) {
    const businessTravel = await BusinessTravel.find({
      company_id: company_id,
    }).lean();
    return businessTravel;
  }

  async createBusinessTravel(businessTravelData) {
    console.log(businessTravelData);

    const newBusinessTravel = new BusinessTravel({
      purpose: businessTravelData.purpose,
      distance: businessTravelData.distance,
      mode: businessTravelData.mode,
      type: businessTravelData.type,
      company_id: businessTravelData.company_id,
      scopeType: businessTravelData.scopeType,
      emissionFactor: businessTravelData.emissionFactor,
      emissions: businessTravelData.emissions,
    });

    await newBusinessTravel.save();
    return newBusinessTravel;
  }

  async updateBusinessTravel(businessTravelId, updateData) {
    const updatedBusinessTravel = await BusinessTravel.findByIdAndUpdate(
      businessTravelId,
      { $set: updateData },
      { new: true }
    );
    if (!updatedBusinessTravel) {
      throw new Error("Business Travel not found");
    }
    return updatedBusinessTravel;
  }

  async deleteBusinessTravel(businessTravelId) {
    const result = await BusinessTravel.findByIdAndDelete(businessTravelId);
    if (!result) {
      throw new Error("Business Travel not found");
    }
    return result;
  }
}

module.exports = BusinessTravelRepo;
