const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/:id', testController.getUserTests);

module.exports = router;
