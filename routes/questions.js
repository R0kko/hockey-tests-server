const express = require('express');
const router = express.Router();
const { createQuestion, deleteQuestion, getQuestion, answerQuestion, noQuestionAnswer} = require('../controllers/questionController');

router.post('/', createQuestion);
router.delete('/deleteQuestion/:questionId', deleteQuestion);
router.get('/:questionId', getQuestion);

router.post('/no-answer/:userTestId/:questionId', noQuestionAnswer);
router.post('/:userTestId/:questionId/:answerId', answerQuestion);

module.exports = router;
