const Device = require('../models/Device'); // Adjust the path as needed

// Add Device Function
exports.addDevice = async (req, res) => {
  const { type, status, temperature } = req.body;

  const device = new Device({ type, status, temperature, user: req.user.id });
  await device.save();

  res.status(201).json(device);
};

// Get Devices Function
exports.getDevices = async (req, res) => {
  const devices = await Device.find({ user: req.user.id });
  res.json(devices);
};

// Update Device Status Function
exports.updateDeviceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const device = await Device.findByIdAndUpdate(id, { status }, { new: true });

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    // Emit the updated device status to all connected clients
    req.app.io.emit('deviceStatusChanged', device);

    return res.status(200).json(device);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addDevice: exports.addDevice,
  getDevices: exports.getDevices,
  updateDeviceStatus: exports.updateDeviceStatus,
};
