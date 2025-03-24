const mongoose = require("mongoose");

const DechetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    type: { type: String, required: true },
    poids: { type: Number, required: true },
    methode: { type: String, required: true },
    scopeType: { type: Number, required: true },
    emissionFactor: { type: String, required: true },
    emissions: { type: String, required: true },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dechet", DechetSchema);
