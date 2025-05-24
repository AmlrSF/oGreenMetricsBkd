const mongoose = require('mongoose');

const BreakdownItemSchema = new mongoose.Schema({
  count: Number,
  sizeKB: String,
  co2g: String
}, { _id: false });

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
    type: String,
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
  },
  breakdown: {
    html: BreakdownItemSchema,
    css: BreakdownItemSchema,
    javascript: BreakdownItemSchema,
    image: BreakdownItemSchema,
    font: BreakdownItemSchema,
    xhr: BreakdownItemSchema,
    other: BreakdownItemSchema
  },
  suggestions: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('WebsiteData', WebsiteDataSchema);
