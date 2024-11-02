const express = require('express');
const dbHandler = require('../dbHandler');
const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const history = await dbHandler.getSearchHistory(page, limit);
    return res.status(200).json(history);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async function(req, res, next) {
  try {
    const deleted = await dbHandler.clearSearchHistory();
    console.log("deleted: " + JSON.stringify(deleted));

    return res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;