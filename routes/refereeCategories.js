const express = require('express');
const router = express.Router();
const refereeCategoryController = require('../controllers/refereeCategoryController');

router.post('/', refereeCategoryController.assignCategory);
router.get('/', refereeCategoryController.getAllRefereeCategories);
router.get('/:id', refereeCategoryController.getRefereeCategory);
router.put('/:id', refereeCategoryController.updateRefereeCategory);
router.delete('/:id', refereeCategoryController.deleteRefereeCategory);

module.exports = router;
