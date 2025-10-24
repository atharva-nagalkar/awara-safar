const express = require('express');
const router = express.Router();
const Trek = require('../models/Trek');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/treks
// @desc    Get all treks
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, difficulty, status, featured } = req.query;
    
    let query = {};
    
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (status) query.status = status;
    if (featured) query.featured = featured === 'true';
    
    const treks = await Trek.find(query).sort({ startDate: 1 });
    
    res.json({
      success: true,
      count: treks.length,
      data: treks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/treks/upcoming
// @desc    Get upcoming treks
// @access  Public
router.get('/upcoming', async (req, res) => {
  try {
    const treks = await Trek.find({
      startDate: { $gte: new Date() },
      status: 'upcoming'
    }).sort({ startDate: 1 });
    
    res.json({
      success: true,
      count: treks.length,
      data: treks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/treks/:id
// @desc    Get single trek
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const trek = await Trek.findById(req.params.id);
    
    if (!trek) {
      return res.status(404).json({
        success: false,
        message: 'Trek not found'
      });
    }
    
    res.json({
      success: true,
      data: trek
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/treks
// @desc    Create new trek
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const trek = await Trek.create(req.body);
    
    // Emit socket event for new trek
    const io = req.app.get('io');
    io.emit('newTrek', trek);
    
    res.status(201).json({
      success: true,
      data: trek
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/treks/:id
// @desc    Update trek
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const trek = await Trek.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!trek) {
      return res.status(404).json({
        success: false,
        message: 'Trek not found'
      });
    }
    
    // Emit socket event for trek update
    const io = req.app.get('io');
    io.emit('trekUpdated', trek);
    
    res.json({
      success: true,
      data: trek
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/treks/:id
// @desc    Delete trek
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const trek = await Trek.findByIdAndDelete(req.params.id);
    
    if (!trek) {
      return res.status(404).json({
        success: false,
        message: 'Trek not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Trek deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
