const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Submit feedback
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { type, subject, message, resource } = req.body;
    
    const feedback = new Feedback({
      user: req.user.id,
      type,
      subject,
      message,
      resource: resource || null
    });

    await feedback.save();

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user feedback
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user.id })
      .sort('-createdAt');

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get all feedback
router.get('/admin/all', adminMiddleware, async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 20 } = req.query;
    
    let filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const skip = (page - 1) * limit;

    const feedback = await Feedback.find(filter)
      .populate('user', 'name email')
      .populate('resource', 'title')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Feedback.countDocuments(filter);

    res.json({
      feedback,
      pagination: {
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Respond to feedback
router.put('/:id/respond', adminMiddleware, async (req, res) => {
  try {
    const { response, status } = req.body;
    
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        response,
        status: status || 'in_progress',
        respondedBy: req.user.id,
        resolvedAt: status === 'resolved' ? new Date() : null
      },
      { new: true }
    );

    res.json({
      message: 'Feedback responded',
      feedback
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
