const mongoose = require("mongoose");

const PurchasedItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Purchased Good", "Purchased Service"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    emissionFactor: {
      type: Number, // kg CO2 per unit or per dollar
      required: true,
    },

    emissions: {
      type: Number, // Auto-calculated: quantity × emissionFactor
    },

    scopeType: {
      type: Number,
      default: 3,
    },

    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PurchasedItem", PurchasedItemSchema);
