const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/test-result/:userId/:userTestId', testController.getTestResult);
router.get('/test-history/:userId', testController.getFinishedTests);
router.get('/:id', testController.getUserTests);
router.get('/:id/:testId', testController.getUserTest);


router.post('/start/:userId/:userTestId', testController.startTest);
router.post('/end/:userId/:userTestId', testController.finishTest);

module.exports = router;
