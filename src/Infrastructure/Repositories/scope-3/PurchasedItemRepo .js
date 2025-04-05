require("dotenv").config();
const PurchasedItem = require("../../../Domain/Entities/scope3/PurchesedItem");

class PurchasedItemRepo {
  async getScope3DataByDateRange(startDate, endDate, company_id) {
    return await PurchasedItem.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      company_id: company_id,
    }).lean();
  }

  async getAllPurchasedItems() {
    return await PurchasedItem.find().lean();
  }

  async getPurchasedItemsByCompanyId(company_id) {
    return await PurchasedItem.find({ company_id }).lean();
  }

  async createPurchasedItem(purchasedItemData) {
    const newItem = new PurchasedItem({
      name: purchasedItemData.name,
      type: purchasedItemData.type,
      quantity: purchasedItemData.quantity,
      emissionFactor: purchasedItemData.emissionFactor,
      emissions: purchasedItemData.emissions,
      scopeType: purchasedItemData.scopeType || 3,
      company_id: purchasedItemData.company_id,
    });
    await newItem.save();
    return newItem;
  }

  async updatePurchasedItem(itemId, updateData) {
    const updatedItem = await PurchasedItem.findByIdAndUpdate(
      itemId,
      { $set: updateData },
      { new: true }
    );
    if (!updatedItem) throw new Error("Purchased Item not found");
    return updatedItem;
  }

  async deletePurchasedItem(itemId) {
    const result = await PurchasedItem.findByIdAndDelete(itemId);
    if (!result) throw new Error("Purchased Item not found");
    return result;
  }
}

module.exports = PurchasedItemRepo;
