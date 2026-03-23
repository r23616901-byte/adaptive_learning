const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/transform', aiController.transformText);

module.exports = router;
