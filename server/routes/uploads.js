const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');
const { protect, authorize } = require('../middleware/auth');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'awara-safar/treks',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

const upload = multer({ storage });

// @route   POST /api/uploads/trek-image
// @desc    Upload a trek image to Cloudinary
// @access  Private/Admin
router.post('/trek-image', protect, authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }
    return res.json({ success: true, url: req.file.path });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Image upload failed' });
  }
});

module.exports = router;
