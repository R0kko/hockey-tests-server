// Import required models and Sequelize instance
const {UserTest, Test, CategoryName, TestType, TestQuestion, UserAnswer, Question} = require("../models/associations");

exports.getUserTests = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({message: "Missing user ID"});
        }

        const userTests = await UserTest.findAll({
            where: {user_id: userId},
            include: [
                {
                    model: Test,
                    include: [
                        {model: CategoryName, attributes: ["name"]},
                        {model: TestType, attributes: ["type_name"]},
                    ],
                    attributes: ["id", "created_at"],
                },
            ],
            attributes: ["id"],
            raw: true,
            nest: true,
        });

        const responseData = userTests.map((userTest) => {
            return {
                user_test_id: userTest.id,
                category_name: userTest.Test.CategoryName.name,
                test_type_name: userTest.Test.TestType.type_name,
                start_date: userTest.Test.created_at,
            };
        });

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error in getUserTests:", error);
        res.status(500).json({message: "Server error"});
    }
};

exports.getUserTest = async (req, res) => {
    try {
        const UserTestId = req.params.testId;
        (console.log(UserTestId));
        if (!UserTestId) {
            return res.status(400).json({message: 'Test ID is required'});
        }

        const test = await UserTest.findOne({where: {id: UserTestId}});
        if (!test) {
            return res.status(404).json({message: 'Test not found'});
        }

        (console.log(test.test_id));
        const testQuestions = await TestQuestion.findAll({where: {test_id: test.test_id}});

        const questionIds = testQuestions.map(testQuestion => testQuestion.question_id);

        res.status(200).json({
            testId: test.id,
            status: test.status,
            questionIds: questionIds,
            amount: testQuestions.length,
        });
    } catch (error) {
        res.status(500).json({message: 'An error occurred while fetching the test and questions', error: error});
    }
};

exports.startTest = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userTestId = req.params.userTestId;

        if (!userId || !userTestId) {
            return res.status(400).json({message: 'User ID and user test ID are required'});
        }

        const userTest = await UserTest.findOne({where: {id: userTestId}});
        if (!userTest) {
            return res.status(404).json({message: 'User test not found'});
        }

        if (userTest.status === 'Started') {
            return res.status(200).json({message: 'Test has already been started'});
        }

        if (userTest.status === 'Finished') {
            return res.status(400).json({message: 'Test has already been started'});
        }

        await userTest.update({status: 'Started'});
        await userTest.update({started_at: new Date()});

        res.status(200).json({message: 'Test started'});
    } catch (error) {
        res.status(500).json({message: 'An error occurred while starting the test', error: error});
        console.log(error);
    }
}

exports.finishTest = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userTestId = req.params.userTestId;

        if (!userId || !userTestId) {
            return res.status(400).json({message: 'User ID and user test ID are required'});
        }

        const userTest = await UserTest.findOne({where: {id: userTestId}});
        if (!userTest) {
            return res.status(404).json({message: 'User test not found'});
        }

        if (userTest.status !== 'Started') {
            return res.status(400).json({message: 'Test has not been started'});
        }

        if (userTest.status === 'Finished') {
            return res.status(400).json({message: 'Test has already been finished'});
        }

        await userTest.update({status: 'Finished'});
        await userTest.update({finished_at: new Date()});

        const userAnswers = await UserAnswer.findAll({where: {user_test_id: userTestId}});
        let score = 0;
        userAnswers.forEach(userAnswer => {
                if (userAnswer.is_correct) {
                    score++;
                }
            }
        );

        await userTest.update({score: score});
        res.status(200).json({message: 'Test finished'});
    } catch (error) {
        res.status(500).json({message: 'An error occurred while finishing the test', error: error});
    }
}

exports.getTestResult = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userTestId = req.params.userTestId;

        if (!userId || !userTestId) {
            return res.status(400).json({message: 'User ID and user test ID are required'});
        }

        const userTest = await UserTest.findOne({where: {id: userTestId}});
        if (!userTest) {
            return res.status(404).json({message: 'User test not found'});
        }


        if (userTest.status !== 'Finished') {
            return res.status(400).json({message: 'Test has not been finished'});
        }

        const userAnswers = await UserAnswer.findAll({where: {user_test_id: userTestId}});
        let score = 0;
        userAnswers.forEach(userAnswer => {
                if (userAnswer.is_correct) {
                    score++;
                }
            }
        );

        await userTest.update({score: score});

        // if there are more than 85% correct answers, the test is passed

        const testQuestions = await TestQuestion.findAll({where: {test_id: userTest.test_id}});
        const amount = testQuestions.length;

        if (score >= amount * 0.85) {
            await userTest.update({sertificate: "https://s3.timeweb.com/065de851-fhr-referee-media/Sertificate.pdf"});
        }

        const incorrectAnswers = await UserAnswer.findAll({where: {user_test_id: userTestId, is_correct: false}});
        const incorrectAnswersIds = incorrectAnswers.map(incorrectAnswer => incorrectAnswer.question_id);
        const incorrectAnswersTexts = await Question.findAll({where: {id: incorrectAnswersIds}});
        const incorrectQuestionTexts = incorrectAnswersTexts.map(incorrectAnswerText => incorrectAnswerText.question_text);

        res.status(200).json({
            score: score,
            amount: testQuestions.length,
            finished_at: userTest.finished_at,
            incorrectAnswers: incorrectQuestionTexts,
        });
    } catch (error) {
        res.status(500).json({message: 'An error occurred while fetching the test result', error: error});
    }
}

exports.getFinishedTests = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({message: 'User ID is required'});
        }

        const userTests = await UserTest.findAll({where: {user_id: userId, status: 'Finished'}});
        const test = await Test.findOne({where: {id: userTests.map(userTest => userTest.test_id)}});

        const testCategories = await Test.findAll({where: {id: userTests.map(userTest => userTest.test_id)}});
        const categories = await CategoryName.findAll({where: {id: testCategories.map(testCategory => testCategory.category_id)}});

        const testTypes = await TestType.findAll({where: {id: test.test_type_id}});
        const testQuestions = await TestQuestion.findAll({where: {test_id: userTests.map(userTest => userTest.test_id)}});

        const responseData = userTests.map(userTest => {
            return {
                id: userTest.id,
                score: userTest.score,
                amount: testQuestions.filter(testQuestion => testQuestion.test_id === userTest.test_id).length,
                finished_at: userTest.finished_at,
                test_type: testTypes.find(testType => testType.id === test.test_type_id).type_name,
                category: categories.find(category => category.id === test.category_id).name,
                sertificate: userTest.sertificate ? userTest.sertificate : null,
            };
        });

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error in getUserTests:", error);
        res.status(500).json({message: "Server error"});
    }
}
