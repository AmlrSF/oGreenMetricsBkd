require("dotenv").config();
const PurchasedGood = require("../../../Domain/Entities/scope3/PurchasedGoodsAndService");

class PurchasedGoodsAndServicesRepo {
  // Get by date range
  async getScope3DataByDateRange(startDate, endDate, company_id) {
    return await PurchasedGood.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      company_id,
    }).lean();
  }

  // Get all
  async getAll() {
    return await PurchasedGood.find().lean();
  }

  // Get by company ID
  async getByCompanyId(company_id) {
    //console.log(company_id);
    
    return await PurchasedGood.find({ company_id }).lean();
  }

  // Create
  async create(data) {
    const quantite = parseFloat(data.quantite);
    const emissionFactor = parseFloat(data.emissionFactor || 0);
    const emissions = quantite * emissionFactor;

    const newItem = new PurchasedGood({
      titre: data.titre,
      type: data.type,
      sousType: data.sousType,
      quantite,
      emissionFactor,
      emissions,
      scopeType: data.scopeType || "3",
      company_id: data.company_id,
    });

    await newItem.save();
    return newItem;
  }

  // Update
  async update(id, updateData) {
    if (updateData.quantite && updateData.emissionFactor) {
      updateData.emissions = parseFloat(updateData.quantite) * parseFloat(updateData.emissionFactor);
    }

    return await PurchasedGood.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Delete
  async delete(id) {
    return await PurchasedGood.findByIdAndDelete(id);
  }
}

module.exports = new PurchasedGoodsAndServicesRepo();
