const express = require('express');
const { addDevice, getDevices, updateDeviceStatus } = require('../controllers/deviceController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, addDevice);
router.get('/', authMiddleware, getDevices);
router.put('/update/:id', authMiddleware, updateDeviceStatus);

module.exports = router;
