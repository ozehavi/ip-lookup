const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  return res.status(200).json({
    title: 'Ip Lookup',
    message: 'The app is working properly!',
  });
});

module.exports = router;