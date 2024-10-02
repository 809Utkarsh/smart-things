const Device = require('../models/Device');

// Add a device for the logged-in user
exports.addDevice = async (req, res) => {
  const { type, status, temperature } = req.body;

  const device = new Device({ type, status, temperature, user: req.user.id });
  await device.save();

  res.status(201).json(device);
};

// Get all devices for the logged-in user
exports.getDevices = async (req, res) => {
  const devices = await Device.find({ user: req.user.id });
  res.json(devices);
};

// Update the status of a device
exports.updateDeviceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const device = await Device.findById(id);
  if (!device) return res.status(404).json({ message: 'Device not found' });

  device.status = status;
  await device.save();

  res.json(device);
};
