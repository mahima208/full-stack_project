const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('downloadedResources', 'title category')
      .populate('savedResources', 'title category');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, institution, bio, interests, profileImage } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, institution, bio, interests, profileImage },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save resource
router.post('/saved-resources/:resourceId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.savedResources.includes(req.params.resourceId)) {
      user.savedResources.push(req.params.resourceId);
      await user.save();
    }

    res.json({ message: 'Resource saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove saved resource
router.delete('/saved-resources/:resourceId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedResources = user.savedResources.filter(id => id.toString() !== req.params.resourceId);
    await user.save();

    res.json({ message: 'Resource removed from saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
