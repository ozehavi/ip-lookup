const express = require('express');
const router = express.Router();
const os = require('os');

const getInternalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName of Object.keys(interfaces)) {
    const addresses = interfaces[interfaceName];
    for (const addr of addresses) {
      if (!addr.internal && addr.family === 'IPv4') {
        return addr.address;
      }
    }
  }
  return 'Unable to determine internal IP';
};

const getPublicIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching public IP:', error);
    return 'Unable to determine public IP';
  }
};

router.get('/', async function(req, res, next) {
  
  try {
    const internalIP = getInternalIP();
    const publicIP = await getPublicIP();
    if(!internalIP || !publicIP)
      return res.status(500).json({ message: 'Unable to fetch IP addresses' });

    return res.status(200).json({
      internal_ip: internalIP,
      public_ip: publicIP,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;