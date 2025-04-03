const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);

module.exports = router;
