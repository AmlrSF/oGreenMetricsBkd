const mongoose = require("mongoose");

const PurchasedGoodAndServiceSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true },         // item_name
    type: { type: String, required: true },          // item_category
    sousType: { type: String, required: true },      // item_type
    quantite: { type: Number, required: true },      // quantity
    emissionFactor: { type: Number, default: 0 },    // optional
    emissions: { type: Number, default: 0 },
    scopeType: { type: String, default: "3" },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PurchasedGood", PurchasedGoodAndServiceSchema);
