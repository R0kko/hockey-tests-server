const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/:id', testController.getUserTests);
router.get('/:id/:testId', testController.getUserTest);

module.exports = router;
