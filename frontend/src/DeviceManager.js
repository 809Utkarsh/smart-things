import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client'; // Import Socket.IO

const DeviceManager = () => {
  const [devices, setDevices] = useState([]);
  const [deviceType, setDeviceType] = useState('');
  const [deviceStatus, setDeviceStatus] = useState('');
  const socket = io('http://localhost:3000'); // Connect to Socket.IO server

  // Fetch devices from the backend
  const fetchDevices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/devices'); // Correct port
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  useEffect(() => {
    // Fetch devices on component mount
    fetchDevices();

    // Listen for real-time device status updates
    socket.on('deviceStatusUpdated', (updatedDevice) => {
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device._id === updatedDevice._id ? updatedDevice : device
        )
      );
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Add a new device
  const addDevice = async () => {
    try {
      const response = await axios.post('http://localhost:3000/devices', {
        type: deviceType,
        status: deviceStatus,
      });
      setDevices([...devices, response.data]);
      setDeviceType('');
      setDeviceStatus('');

      // Emit the new device status to all connected clients
      socket.emit('deviceStatusChanged', response.data);
    } catch (error) {
      console.error('Error adding device:', error);
    }
  };

  return (
    <div>
      <h1>Device Manager</h1>
      <input
        type="text"
        placeholder="Device Type"
        value={deviceType}
        onChange={(e) => setDeviceType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Device Status"
        value={deviceStatus}
        onChange={(e) => setDeviceStatus(e.target.value)}
      />
      <button onClick={addDevice}>Add Device</button>
      <h2>Devices</h2>
      <ul>
        {devices.map((device) => (
          <li key={device._id}>
            {device.type} - {device.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceManager;
