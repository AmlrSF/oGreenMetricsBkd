const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, default: 'Reduction Goal' },
  year: { type: Number, required: true },
  scope1Goal: { type: Number, default: 0 },
  scope2Goal: { type: Number, default: 0 },
  scope3Goal: { type: Number, default: 0 },
  totalGoal: { type: Number, default: 0 },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in-progress', 'achieved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Goal', goalSchema);