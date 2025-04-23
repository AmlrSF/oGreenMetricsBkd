const mongoose = require('mongoose');

const WebsiteDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Utilisateur' 
  },
  url: {
    type: String,
    required: true
  },
  green: {
    type: Boolean,
    default: false
  },
  bytes: Number,
  cleanerThan: Number,
  rating: String,
  statistics: {
    adjustedBytes: Number,
    energy: Number,
    co2: {
      grid: {
        grams: Number,
        litres: Number
      },
      renewable: {
        grams: Number,
        litres: Number
      }
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WebsiteData', WebsiteDataSchema);
