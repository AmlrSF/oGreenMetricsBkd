const mongoose = require('mongoose');

const energyConsumptionSchema = new mongoose.Schema({
  yearlyConsumption: { type: Number, required: true, default: 0 },
  emissions: { type: Number, default: 0 },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EnergyConsumption', energyConsumptionSchema);