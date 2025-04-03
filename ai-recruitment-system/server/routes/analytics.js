const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {
  getJobMetrics,
  getApplicationMetrics,
  getCandidateMetrics,
  getAIPerformanceMetrics
} = require('../controllers/analyticsController');


router.get('/jobs', authMiddleware, getJobMetrics);
router.get('/applications', authMiddleware, getApplicationMetrics);
router.get('/candidates', authMiddleware, getCandidateMetrics);
router.get('/ai-performance', authMiddleware, getAIPerformanceMetrics);

module.exports = router;
