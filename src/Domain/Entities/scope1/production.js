const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  quantite: { type: Number, required: true },
  co2Emission: { type: Number, default: 0 },
  ligneDeProduction: { type: String, required: true }, 
});

const productionSchema = new mongoose.Schema({
  products: [productSchema],
  totalEmissions: { type: Number, default: 0 },
  emissionFactor: { type: Number, default: 0 },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Production', productionSchema);