const mongoose = require('mongoose');

const trekSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a trek title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  type: {
    type: String,
    enum: ['trek', 'tour'],
    default: 'trek'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'difficult', 'extreme'],
    default: 'moderate'
  },
  duration: {
    type: String,
    required: [true, 'Please provide duration']
  },
  price: {
    type: Number,
    required: [true, 'Please provide price']
  },
  location: {
    type: String,
    required: [true, 'Please provide location']
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date']
  },
  maxParticipants: {
    type: Number,
    default: 20
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  images: [{
    type: String
  }],
  highlights: [{
    type: String
  }],
  itinerary: [{
    day: Number,
    title: String,
    description: String
  }],
  included: [{
    type: String
  }],
  excluded: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for searching
trekSchema.index({ title: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Trek', trekSchema);
