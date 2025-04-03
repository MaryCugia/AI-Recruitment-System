const express = require('express');
const router = express.Router();
const { createOrUpdateUser, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/user', authMiddleware, createOrUpdateUser);
router.get('/user', authMiddleware, getCurrentUser);

module.exports = router;
