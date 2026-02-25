const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const { authMiddleware } = require('../middleware/authMiddleware');

// Get all resources with filters and pagination
router.get('/', async (req, res) => {
  try {
    const { category, level, resourceType, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    
    let query = { isApproved: true, isPublic: true };
    
    if (category) query.category = category;
    if (level) query.level = level;
    if (resourceType) query.resourceType = resourceType;

    const skip = (page - 1) * limit;
    
    const resources = await Resource.find(query)
      .populate('category', 'name icon')
      .populate('uploadedBy', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Resource.countDocuments(query);

    res.json({
      resources,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        perPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search resources
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const resources = await Resource.find(
      { $text: { $search: query }, isApproved: true, isPublic: true },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('category', 'name icon')
      .populate('uploadedBy', 'name email');

    const total = await Resource.countDocuments({
      $text: { $search: query },
      isApproved: true,
      isPublic: true
    });

    res.json({
      resources,
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

// Get resource by ID
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('category')
      .populate('uploadedBy', 'name email')
      .populate('reviews');

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Increment views
    resource.views += 1;
    await resource.save();

    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload resource (authenticated)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, author, category, resourceType, subject, level, tags, fileUrl, fileMimeType } = req.body;

    const resource = new Resource({
      title,
      description,
      author,
      category,
      resourceType,
      subject,
      level,
      tags,
      fileUrl,
      fileMimeType,
      uploadedBy: req.user.id,
      isApproved: req.user.role === 'admin' // Auto-approve for admins
    });

    await resource.save();
    await resource.populate('category uploadedBy');

    res.status(201).json({
      message: 'Resource uploaded successfully',
      resource
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download resource
router.post('/:id/download', authMiddleware, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    resource.downloads += 1;
    await resource.save();

    res.json({
      message: 'Download initiated',
      downloads: resource.downloads
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
