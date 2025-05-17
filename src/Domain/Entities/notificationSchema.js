const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Utilisateur', 
    required: function() { 
      return this.type === 'goal_achieved' || this.type === 'info' || this.type === 'warning'; 
    }
  },
  goal_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Goal', 
    required: function() { return this.type === 'goal_achieved'; }
  },
  entity_id: { 
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'entity_type',
    required: function() { 
      return this.type === 'admin_user_reminder' || this.type === 'admin_company_reminder'; 
    }
  },
  entity_type: {
    type: String,
    enum: ['Utilisateur', 'Company'],
    required: function() { 
      return this.type === 'admin_user_reminder' || this.type === 'admin_company_reminder'; 
    }
  },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['goal_achieved', 'info', 'warning', 'admin_user_reminder', 'admin_company_reminder'], 
    default: 'goal_achieved' 
  },
  is_read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Updated index to only apply to goal_achieved notifications
notificationSchema.index({ 
  user_id: 1, 
  goal_id: 1
}, { 
  unique: true,
  partialFilterExpression: { 
    type: 'goal_achieved'
  }
});

// Separate index for admin reminders based on entity_id and type
notificationSchema.index({ 
  entity_id: 1, 
  type: 1
}, { 
  unique: true,
  partialFilterExpression: { 
    $or: [
      { type: 'admin_user_reminder' },
      { type: 'admin_company_reminder' }
    ]
  }
});

module.exports = mongoose.model('Notification', notificationSchema);