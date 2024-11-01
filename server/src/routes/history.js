const express = require('express');
const { getSearchHistory, clearAllSearches } = require('../models/DomainSearch');
const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const history = await getSearchHistory(1, 10);
    console.log("history: " + JSON.stringify(history));

    return res.status(200).json(history);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async function(req, res, next) {
  try {
    const deleted = await clearAllSearches();
    console.log("deleted: " + JSON.stringify(deleted));

    return res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;