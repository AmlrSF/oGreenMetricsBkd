const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  typeDeCarburant: { type: String, required: true },
  quantite: { type: Number, required: true },
  co2Emission: { type: Number, required: true },
  emissionFactor: { type: Number, required: true },
});

const FuelCombutionSchema = new mongoose.Schema({
  machines: [MachineSchema],
  totalEmissions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FuelCombution', FuelCombutionSchema);