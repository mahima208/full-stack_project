const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: '📚'
  },
  color: {
    type: String,
    default: '#007bff'
  },
  subcategories: {
    type: [String],
    default: []
  },
  resourceCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
