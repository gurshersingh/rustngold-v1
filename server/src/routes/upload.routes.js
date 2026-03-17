const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary } = require('../config/cloudinary');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { AppError } = require('../utils/AppError');

// Multer config: store in memory, limit 5MB, images only
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Only JPEG, PNG, and WebP images are allowed', 400, 'INVALID_FILE_TYPE'));
    }
  },
});

router.use(authenticate, requireRole('admin', 'manager'));

// POST /api/admin/upload
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw AppError.badRequest('No image file provided');
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'rustngold/menu',
          transformation: [
            { width: 800, height: 600, crop: 'limit', quality: 'auto' },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    res.json({
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
