const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {
  getDashboardStats,
  getPostedJobs,
  getApplications,
  updateApplicationStatus,
  searchCandidates,
  getAIInsights
} = require('../controllers/recruiterController');

router.get('/dashboard', authMiddleware, getDashboardStats);
router.get('/jobs', authMiddleware, getPostedJobs);

router.get('/applications', authMiddleware, getApplications);
router.put('/applications/:id/status', authMiddleware, updateApplicationStatus);

router.get('/candidates/search', authMiddleware, searchCandidates);
router.get('/insights/:jobId', authMiddleware, getAIInsights);

module.exports = router;
