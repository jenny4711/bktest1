// routes/index.js
const express = require('express');
const router = express.Router();
const areaApi = require('./area.api');

router.use('/ai', areaApi);

module.exports = router;
