class Observer {
  constructor() {
    this.devices = [];
  }

  subscribe(device) {
    this.devices.push(device);
  }

  notifyDevices() {
    this.devices.forEach(device => {
      // Custom logic for each device
      if (device.type === 'thermostat' && device.temperature > 75) {
        device.status = 'off'; // turn off lights if thermostat exceeds 75
      }
      console.log(`Device ${device.type} status updated: ${device.status}`);
    });
  }
}

module.exports = Observer;
