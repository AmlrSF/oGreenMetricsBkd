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
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    includeCharts: { type: String, enum: ["yes", "no"], default: "yes" },
    detailLevel: {
      type: String,
      enum: ["summary", "detailed"],
      default: "summary",
    },
    scope1Data: [
      {
        schemaType: { type: String, enum: ["FuelCombution", "Production"] },
        refId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "scope1Data.schemaType",
        },
      },
    ],
    scope2Data: [
      {
        schemaType: {
          type: String,
          enum: ["Cooling", "Heating", "EnergyConsumption"],
        },
        refId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "scope2Data.schemaType",
        },
      },
    ],
    scope3Data: [
      {
        schemaType: {
          type: String,
          enum: ["BusinessTravel", "Transport", "Dechet", "CapitalGood"],
        },
        refId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "scope3Data.schemaType",
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now }, // Timestamp
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
