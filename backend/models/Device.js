const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  type: { type: String, required: true }, // light, thermostat, door
  status: { type: String, default: 'off' }, // on/off/locked/unlocked
  temperature: { type: Number }, // only for thermostat
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // linked to user
});

module.exports = mongoose.model('Device', DeviceSchema);
