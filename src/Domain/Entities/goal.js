const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  scope1Goal: { type: Number, default: 0 },
  scope2Goal: { type: Number, default: 0 },
  scope3Goal: { type: Number, default: 0 },
  totalGoal: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Goal', goalSchema);