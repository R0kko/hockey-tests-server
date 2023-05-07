const {Media, Question, Answer, DifficultyLevel, UserAnswer} = require("../models/associations");

exports.createQuestion = async (req, res) => {
    try {
        const { question_text, level_name, media_url, media_type, answers } = req.body;

        if (!question_text || !level_name || !answers || answers.length !== 3) {
            return res.status(400).json({ message: 'Invalid request data' });
        }

        let mediaObject;
        if (media_url) {
            const result = await Media.findOrCreate({
                where: { url: media_url },
                defaults: { file_type: media_type, file_name: media_url }
            });
            mediaObject = result[0];
        }

        const difficultyLevel = await DifficultyLevel.findOne({ where: { level_name: level_name } });
        if (!difficultyLevel) {
            return res.status(400).json({ message: 'Difficulty level not found' });
        }

        const question = new Question({
            question_text,
            difficulty_id: difficultyLevel.id,
            media_id: mediaObject ? mediaObject.id : null
        });

        await question.save();

        const createdAnswers = [];
        for (const answerData of answers) {
            const answer = new Answer({ ...answerData, question_id: question.id});
            await answer.save();
            createdAnswers.push(answer);
        }

        res.status(201).json({
            message: 'Question and answers created successfully',
            question: question.question_text,
            answers: createdAnswers.map(answer => answer.answer_text),
            media: mediaObject ? mediaObject.url : null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the question and answers' });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (!questionId) {
            return res.status(400).json({ message: 'Question ID is required' });
        }

        const question = await Question.findByPk(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const mediaId = question.media_id;

        await Answer.destroy({ where: { question_id: questionId } });
        await question.destroy();

        if (mediaId) {
            await Media.destroy({ where: { id: mediaId } });
        }

        res.status(200).json({ message: 'Question, answers, and associated media (if any) deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the question, answers, and associated media (if any)' });
    }
};

exports.getQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (!questionId) {
            return res.status(400).json({ message: 'Question ID is required' });
        }

        const question = await Question.findOne({
            where: { id: questionId },
            include: [
                {
                    model: DifficultyLevel,
                    attributes: ['level_name']
                }
            ]
        });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const answers = await Answer.findAll({
            where: { question_id: questionId },
            attributes: ['id', 'answer_text']
        });

        let mediaUrl = null;
        if (question.media_id) {
            const media = await Media.findOne({ where: { id: question.media_id }, attributes: ['url'] });
            mediaUrl = media.url;
        }

        res.status(200).json({
            id: question.id,
            question_text: question.question_text,
            level_name: question.DifficultyLevel.level_name,
            answers: answers.map(answer => ({ id: answer.id, text: answer.answer_text })),
            media_url: mediaUrl
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the question details' });
    }
};

exports.answerQuestion = async (req, res) => {
    try {
        const usertestId = req.params.userTestId;
        const questionId = req.params.questionId;
        const answerId = req.params.answerId;

        if (!usertestId || !questionId || !answerId) {
            return res.status(400).json({ message: 'User test ID, question ID, and answer ID are required' });
        }

        const question = await Question.findByPk(questionId);
        if (!question) {
            console.log('Question not found');
            return res.status(404).json({ message: 'Question not found' });
        }

        const answer = await Answer.findByPk(answerId);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        const isCorrect = answer.is_correct;

        // if answer already exists, return the answer
        const existingAnswer = await UserAnswer.findOne({
            where: { user_test_id: usertestId, question_id: questionId }
        });
        if (existingAnswer) {
            return res.status(200).json({ isCorrect });
        }

        // Save the user's answer in the UserAnswer table
        await UserAnswer.create({
            user_test_id: usertestId,
            question_id: questionId,
            answer_id: answerId,
            is_correct: isCorrect,
        });

        res.status(200).json({ isCorrect });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while checking the answer' });
    }
};

exports.noQuestionAnswer = async (req, res) => {
    try {
        const usertestId = req.params.userTestId;
        const questionId = req.params.questionId;

        if (!usertestId || !questionId) {
            return res.status(400).json({ message: 'User test ID, question ID are required' });
        }

        const question = await Question.findByPk(questionId);
        if (!question) {
            console.log('Question not found');
            return res.status(404).json({ message: 'Question not found' });
        }

        const isCorrect = false;

        const existingAnswer = await UserAnswer.findOne({
            where: { user_test_id: usertestId, question_id: questionId }
        });
        if (existingAnswer) {
            return res.status(200).json({ isCorrect });
        }

        // Save the user's answer in the UserAnswer table
        await UserAnswer.create({
            user_test_id: usertestId,
            question_id: questionId,
            answer_id: null,
            is_correct: false,
        });
        res.status(200).json({ isCorrect });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while checking the answer' });
    }
}