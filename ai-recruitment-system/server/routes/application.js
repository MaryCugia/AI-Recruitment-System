const express = require('express');
const router = express.Router();
const {
  apply,
  getApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');
const authMiddleware = require('../middleware/auth');

router.post('/jobs/:jobId/apply', authMiddleware, apply);
router.get('/', authMiddleware, getApplications);
router.put('/:id/status', authMiddleware, updateApplicationStatus);

module.exports = router;
