const express = require('express');
const router = express.Router();
const dns = require('dns').promises;

async function resolveDomainIp(domain) {
  try {
    const addresses = await dns.resolve4(domain);

    if (!addresses || addresses.length === 0) {
      throw new Error('No IP addresses found for this domain');
    }

    return addresses[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to resolve domain: ${error.message}`);
    }
    throw new Error('Failed to resolve domain');
  }
}

router.get('/:domain', async function(req, res, next) {
  try {
    const domainIp = await resolveDomainIp(req.params.domain);
    if(!domainIp)
      return res.status(500).json({ message: 'Unable to fetch domain ip' });

    return res.status(200).json({
      domainIp: domainIp
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;