const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subcategory: {
    type: String,
    default: null
  },
  resourceType: {
    type: String,
    enum: ['textbook', 'research_paper', 'study_guide', 'video', 'worksheet', 'presentation', 'other'],
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    default: 0
  },
  fileMimeType: {
    type: String,
    default: null
  },
  coverImage: {
    type: String,
    default: null
  },
  tags: {
    type: [String],
    default: [],
    index: true
  },
  subject: {
    type: String,
    required: true,
    index: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'professional'],
    required: true
  },
  language: {
    type: String,
    default: 'English'
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  approvalDate: {
    type: Date,
    default: null
  },
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Review',
    default: []
  },
  keywords: {
    type: [String],
    default: [],
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    default: null
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Text index for full-text search
resourceSchema.index({ title: 'text', description: 'text', tags: 'text', keywords: 'text' });

module.exports = mongoose.model('Resource', resourceSchema);
