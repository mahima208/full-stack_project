const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const User = require('../models/User');
const { adminMiddleware } = require('../middleware/authMiddleware');

// Get all pending resources for approval
router.get('/resources/pending', adminMiddleware, async (req, res) => {
  try {
    const resources = await Resource.find({ isApproved: false })
      .populate('uploadedBy', 'name email')
      .populate('category', 'name')
      .sort('-createdAt');

    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve resource
router.post('/resources/:id/approve', adminMiddleware, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { 
        isApproved: true,
        approvedBy: req.user.id,
        approvalDate: new Date()
      },
      { new: true }
    );

    res.json({
      message: 'Resource approved',
      resource
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject resource
router.post('/resources/:id/reject', adminMiddleware, async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);

    res.json({ message: 'Resource rejected and deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get users statistics
router.get('/statistics', adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResources = await Resource.countDocuments();
    const totalDownloads = await Resource.aggregate([
      { $group: { _id: null, downloads: { $sum: '$downloads' } } }
    ]);
    const pendingApprovals = await Resource.countDocuments({ isApproved: false });

    res.json({
      totalUsers,
      totalResources,
      totalDownloads: totalDownloads[0]?.downloads || 0,
      pendingApprovals
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
