const express = require('express');
const router = express.Router();
const travelPlanner  = require('../controllers/travelController');

router.post('/plan-trip', travelPlanner);

module.exports = router;
