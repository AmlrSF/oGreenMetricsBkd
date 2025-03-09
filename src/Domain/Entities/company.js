const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  nom_entreprise: { type: String, required: true },
  matricule_fiscale: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  num_tel: { type: String, required: true },
  adresse: { type: String, required: true },
  date_fondation: { type: Date, required: true },
  industrie: { type: String, required: true },
  isVerified : {type: Boolean, default: false ,required: true}
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);

