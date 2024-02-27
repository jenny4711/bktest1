const express = require('express');
const router = express.Router();
const areaController = require('../controller/area.controller');

router.post('/', areaController.makeResult);

module.exports = router;