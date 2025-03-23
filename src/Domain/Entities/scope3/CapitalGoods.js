const mongoose = require("mongoose");

const CapitalGoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Manufacturing Equipment",
        "Vehicles",
        "Buildings",
        "IT Equipment",
      ],
      required: true,
    },
    cost: { type: Number, required: true },
    lifetime: { type: Number, required: true },
    emissionFactor: { type: String, required: true },
    scopeType: { type: Number, required: true },
    emissions: { type: String, required: true },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CapitalGood", CapitalGoodSchema);
