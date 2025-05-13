const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  goal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['goal_achieved', 'info', 'warning'], 
    default: 'goal_achieved' 
  },
  is_read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);