const mongoose = require('mongoose');

const energyConsumptionSchema = new mongoose.Schema({
  yearlyConsumption: { type: Number, required: true, default: 0 },
  emissions: { type: Number, default: 0 },
  country: { type: String, required: true },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // Added
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EnergyConsumption', energyConsumptionSchema);