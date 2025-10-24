const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Trek = require('../models/Trek');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/bookings
// @desc    Get all bookings (admin) or user's bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let bookings;
    
    if (req.user.role === 'admin') {
      bookings = await Booking.find()
        .populate('user', 'name email phone')
        .populate('trek', 'title startDate endDate location price')
        .sort({ createdAt: -1 });
    } else {
      bookings = await Booking.find({ user: req.user.id })
        .populate('trek', 'title startDate endDate location price images')
        .sort({ createdAt: -1 });
    }
    
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('trek');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { trek, numberOfPeople, specialRequests, emergencyContact } = req.body;
    
    // Check if trek exists
    const trekData = await Trek.findById(trek);
    if (!trekData) {
      return res.status(404).json({
        success: false,
        message: 'Trek not found'
      });
    }
    
    // Check availability
    if (trekData.currentParticipants + numberOfPeople > trekData.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Not enough spots available'
      });
    }
    
    // Calculate total amount
    const totalAmount = trekData.price * numberOfPeople;
    
    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      trek,
      numberOfPeople,
      totalAmount,
      specialRequests,
      emergencyContact
    });
    
    // Update trek participants
    trekData.currentParticipants += numberOfPeople;
    await trekData.save();
    
    // Update user bookings
    await User.findByIdAndUpdate(req.user.id, {
      $push: { bookings: booking._id }
    });
    
    // Emit socket event for new booking
    const io = req.app.get('io');
    io.emit('newBooking', {
      userId: req.user.id,
      booking: await booking.populate('trek', 'title startDate')
    });
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Only admin can update or user can cancel their own booking
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('trek', 'title startDate');
    
    // Emit socket event for booking update
    const io = req.app.get('io');
    io.emit('bookingUpdated', {
      userId: booking.user,
      booking: updatedBooking
    });
    
    res.json({
      success: true,
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel booking
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Check authorization
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }
    
    // Update trek participants
    const trek = await Trek.findById(booking.trek);
    if (trek) {
      trek.currentParticipants -= booking.numberOfPeople;
      await trek.save();
    }
    
    // Update booking status instead of deleting
    booking.status = 'cancelled';
    await booking.save();
    
    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
