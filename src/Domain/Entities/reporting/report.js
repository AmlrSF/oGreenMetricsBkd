const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    scope1: { type: Boolean, default: false },
    scope2: { type: Boolean, default: false },
    scope3: { type: Boolean, default: false },
    Year: { type: String, default: true },
    includeCharts: { type: String, enum: ["yes", "no"], default: "yes" },
    detailLevel: {
      type: String,
      enum: ["summary", "detailed"],
      default: "summary",
    },
    includeRecomondations: {
       type: String, enum: ["yes", "no"], default: "yes" },
    
    scope1Data: {
      fuelCombution: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FuelCombution",
        },
      ],
      production: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Production",
        },
      ],
    },
   
    scope2Data: {
      cooling: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cooling",
        },
      ],
      heating: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Heating",
        },
      ],
      energyConsumption: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "EnergyConsumption",
        },
      ],
    },

    scope3Data: {
      businessTravel: [{ type: mongoose.Schema.Types.ObjectId, ref: "BusinessTravel" }],
      transport: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transport" }],
      dechet: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dechet" }],
      capitalGood: [{ type: mongoose.Schema.Types.ObjectId, ref: "CapitalGood" }],
      businessTravelEmissions: { type: Number, default: 0 },
      transportEmissions: { type: Number, default: 0 },
      dechetEmissions: { type: Number, default: 0 },
      capitalGoodEmissions: { type: Number, default: 0 },
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
