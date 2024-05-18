const express = require('express');
const code = require('../controllers/code_controller');
const protect= require('../middlewares/user_middleware');

const router = express.Router();

router.post('/add', protect, code.addCode);
router.get('/get', protect, code.getMyCodes);
router.put('/update/:id', protect, code.updateCode);
router.delete('/delete/:id', protect, code.deleteCode);

module.exports = router;
