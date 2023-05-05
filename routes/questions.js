const express = require('express');
const router = express.Router();
const { createQuestion, deleteQuestion, getQuestion} = require('../controllers/questionController');

router.post('/', createQuestion);
router.delete('/deleteQuestion/:questionId', deleteQuestion);
router.get('/:questionId', getQuestion);

module.exports = router;
