const express = require('express');
const dbHandler = require('../dbHandler');
const router = express.Router();
const dns = require('dns').promises;

async function resolveDomainIp(domain) {
  try {
    const addresses = await dns.resolve4(domain);

    if (!addresses || addresses.length === 0) {
      return {
        domain: domain,
        success: false,
        message: 'No IP addresses found for this domain',
        timestamp: Date.now()
      };
    }

    return {
      domain: domain,
      success: true,
      ip: addresses[0],
      allIps: addresses,
      timestamp: Date.now()
    };
  } catch (error) {
    return {
      domain: domain,
      success: false,
      message: `Failed to resolve domain: ${error.message || 'Unknown error'}`,
      timestamp: Date.now()
    };
  }
}

router.get('/:domain', async function(req, res, next) {
  try {
    const domainObject = await resolveDomainIp(req.params.domain);
    // save search to db 

    // handle fail?
    await dbHandler.saveSearchRecord(domainObject);


    return res.status(200).json(domainObject);
  } catch (error) {
    next(error);
  }
});

module.exports = router;