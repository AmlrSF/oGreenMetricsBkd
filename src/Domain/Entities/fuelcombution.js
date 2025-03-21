// Modified fuelcombution.js (Domain/Entities)
const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  typeDeCarburant: { type: String, required: true },
  quantite: { type: Number, required: true },
  co2Emission: { type: Number, default: 0 },
  emissionFactor: { type: Number, default: 0 },
});

const fuelCombutionSchema = new mongoose.Schema({
  machines: [machineSchema],
  totalEmissions: { type: Number, default: 0 },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FuelCombution', fuelCombutionSchema);