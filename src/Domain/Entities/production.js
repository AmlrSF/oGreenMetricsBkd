const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  quantite: { type: Number, required: true },
  co2Emission: { type: Number, required: true },
  emissionFactor: { type: Number, required: true },
});

const ProductionSchema = new mongoose.Schema({
  products: [ProductSchema],
  totalEmissions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Production', ProductionSchema);