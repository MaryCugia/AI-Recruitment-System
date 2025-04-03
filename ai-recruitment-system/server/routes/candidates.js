const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { upload } = require('../config/storage');

const {
  updateProfile,
  uploadResume,
  searchJobs,
  getApplicationHistory,
  getRecommendedJobs
} = require('../controllers/candidateController');

router.put('/profile', authMiddleware, updateProfile);
router.post('/resume', authMiddleware, upload.single('resume'), uploadResume);

router.get('/jobs/search', authMiddleware, searchJobs);
router.get('/applications', authMiddleware, getApplicationHistory);
router.get('/jobs/recommended', authMiddleware, getRecommendedJobs);

module.exports = router;
