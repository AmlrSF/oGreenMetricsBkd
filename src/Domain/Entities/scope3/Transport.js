const mongoose = require('mongoose');

const TransportSchema = new mongoose.Schema({
  purpose: { type: String, required: true },       
  distance: { type: Number, required: true },      
  poids: { type: Number, required: true },         
  mode: { type: String, required: true },          
  type: { type: String },          
  company_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company',                               
    required: true
  },
  scopeType: { type: Number, required: true },     
  emissionFactor: { type: String, required: true},
  emissions: { type: String ,required: true},     
}, { timestamps: true });

module.exports = mongoose.model('Transport', TransportSchema);
