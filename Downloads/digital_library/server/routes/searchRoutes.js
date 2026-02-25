const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Advanced search with filters
router.get('/', async (req, res) => {
  try {
    const { query, category, level, resourceType, subject, language, page = 1, limit = 20 } = req.query;
    
    let filter = { isApproved: true, isPublic: true };
    
    if (query) {
      filter.$text = { $search: query };
    }
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (resourceType) filter.resourceType = resourceType;
    if (subject) filter.subject = subject;
    if (language) filter.language = language;

    const skip = (page - 1) * limit;

    const results = await Resource.find(filter)
      .populate('category', 'name icon')
      .populate('uploadedBy', 'name')
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Resource.countDocuments(filter);

    res.json({
      results,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
