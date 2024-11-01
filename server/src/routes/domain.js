const express = require('express');
const router = express.Router();
const dns = require('dns').promises;

async function resolveDomainIp(domain) {
  try {
    const addresses = await dns.resolve4(domain);

    if (!addresses || addresses.length === 0) {
      return { domain: domain, success: false, message: 'No IP addresses found for this domain' };
    }

    return { domain: domain, success: true, ip: addresses[0] };
  } catch (error) {
    if (error instanceof Error) {
      return { domain: domain, success: false, message: `Failed to resolve domain: ${error.message}` };
    }
    return { domain: domain, success: false, message: 'Failed to resolve domain' };
  }
}

router.get('/:domain', async function(req, res, next) {
  try {
    const domainObject = await resolveDomainIp(req.params.domain);
    // save search to db 
    

    return res.status(200).json({
      ...domainObject,
      timestamp: new Date().getTime()
  });
  } catch (error) {
    next(error);
  }
});

module.exports = router;