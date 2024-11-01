const express = require('express');
const { addSearchRecord } = require('../models/DomainSearch');
const router = express.Router();
const dns = require('dns').promises;

async function resolveDomainIp(domain) {
  const time = new Date().getTime();
  
  try {
    const addresses = await dns.resolve4(domain);

    if (!addresses || addresses.length === 0) {
      return { domain: domain, success: false, message: 'No IP addresses found for this domain' };
    }

    return { domain: domain, success: true, ip: addresses[0], timestamp: time };
  } catch (error) {
    if (error instanceof Error) {
      return { domain: domain, success: false, message: `Failed to resolve domain: ${error.message}`, timestamp: time };
    }
    return { domain: domain, success: false, message: 'Failed to resolve domain', timestamp: time };
  }
}

router.get('/:domain', async function(req, res, next) {
  try {
    const domainObject = await resolveDomainIp(req.params.domain);
    // save search to db 

    await addSearchRecord(domainObject);
    // const history = await getSearchHistory(1, 10); // page 1, 10 items per page
    // console.log("history: " + JSON.stringify(history));


    return res.status(200).json(domainObject);
  } catch (error) {
    next(error);
  }
});

module.exports = router;