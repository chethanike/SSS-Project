const express = require('express');
const router = express.Router();
const authController = require('../controllers/userManagement_controller');
const authMiddleware = require('../middlewares/user_middleware');

// Registration route
router.post('/user_register', authController.register);

// Login route
router.post('/user_login', authController.login);

module.exports = router;

