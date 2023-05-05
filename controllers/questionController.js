const {Media, Question, Answer, DifficultyLevel} = require("../models/associations");

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
            const answer = new Answer({ ...answerData, question_id: question.id });
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
            attributes: ['answer_text']
        });

        let mediaUrl = null;
        if (question.media_id) {
            const media = await Media.findOne({ where: { id: question.media_id }, attributes: ['url'] });
            mediaUrl = media.url;
        }

        res.status(200).json({
            question_text: question.question_text,
            level_name: question.DifficultyLevel.level_name,
            answers: answers.map(answer => answer.answer_text),
            media_url: mediaUrl
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the question details' });
    }
};
