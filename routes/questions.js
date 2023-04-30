const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions, getQuestion, updateQuestion, deleteQuestion} = require('../controllers/questionController'); // Fix the import path here

router.post('/', createQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getQuestion);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
