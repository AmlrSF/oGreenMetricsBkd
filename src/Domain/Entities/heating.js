// Entities/heating.js
const mongoose = require('mongoose');

const heaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  energy: { type: Number, required: true },
  emissionFactor: { type: Number, default: 0 },
  emissions: { type: Number, default: 0 },
});

const heatingSchema = new mongoose.Schema({
  heaters: [heaterSchema],
  totalEmissions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Heating', heatingSchema);