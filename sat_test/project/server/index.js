const express = require('express');
const wifi = require('node-wifi');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
app.use(cors());

// Initialize wifi module
wifi.init({
  iface: null // network interface, choose a specific one if you need
});

// Get WiFi networks
app.get('/api/wifi', async (req, res) => {
  try {
    const networks = await wifi.scan();
    res.json(networks.map(network => ({
      ssid: network.ssid,
      strength: Math.abs(network.signal_level),
      security: network.security,
      frequency: network.frequency || '2.4GHz',
      channel: network.channel || 1,
      lastSeen: new Date()
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Bluetooth devices (using system bluetoothctl)
app.get('/api/bluetooth', (req, res) => {
  exec('bluetoothctl devices', (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    
    const devices = stdout.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [_, mac, name] = line.match(/Device\s+([^\s]+)\s+(.+)/) || [];
        return {
          name: name || 'Unknown Device',
          macAddress: mac || '',
          rssi: -70, // Default value as bluetoothctl doesn't always provide RSSI
          type: 'Unknown',
          lastSeen: new Date()
        };
      });
    
    res.json(devices);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});