const mongoose = require('mongoose');

const EmployesTransportSchema = new mongoose.Schema({
  depart: { type: String, required: true },               // Departure location
  destination: { type: String, required: true },          // Destination
  distance: { type: Number, required: true },             // Distance traveled
  nombreEmployes: { type: Number, required: true },       // Number of employees transported
  mode: { type: String, required: true },                 // Mode of transport
  nomBus: { type: String, required: true },               // Name of the bus
  matricule: { type: String, required: true },            // Bus license plate
  company_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company',                                       // Reference to the Company model
    required: true
  },
  scopeType: { type: Number, required: true },            // Scope type for emission
  emissionFactor: { type: String, required: true },       // Emission factor
  emissions: { type: String ,required: true },            // Calculated emissions
}, { timestamps: true });

module.exports = mongoose.model('EmployesTransport', EmployesTransportSchema);
