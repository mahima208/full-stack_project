const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const { adminMiddleware } = require('../middleware/authMiddleware');

// Get analytics dashboard data
router.get('/dashboard', adminMiddleware, async (req, res) => {
  try {
    // Overall statistics
    const totalResources = await Resource.countDocuments();
    const approvedResources = await Resource.countDocuments({ isApproved: true });
    const totalDownloads = await Resource.aggregate([
      { $group: { _id: null, totalDownloads: { $sum: '$downloads' } } }
    ]);
    const totalViews = await Resource.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    // Resources by type
    const resourcesByType = await Resource.aggregate([
      { $group: { _id: '$resourceType', count: { $sum: 1 } } }
    ]);

    // Resources by level
    const resourcesByLevel = await Resource.aggregate([
      { $group: { _id: '$level', count: { $sum: 1 } } }
    ]);

    // Top resources
    const topResources = await Resource.find()
      .sort('-downloads')
      .limit(10)
      .select('title downloads views');

    // Recent uploads
    const recentUploads = await Resource.find()
      .sort('-createdAt')
      .limit(5)
      .select('title createdAt');

    res.json({
      statistics: {
        totalResources,
        approvedResources,
        totalDownloads: totalDownloads[0]?.totalDownloads || 0,
        totalViews: totalViews[0]?.totalViews || 0
      },
      resourcesByType,
      resourcesByLevel,
      topResources,
      recentUploads
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
