// Import required models and Sequelize instance
const { UserTest, Test, CategoryName, TestType, TestQuestion} = require("../models/associations");

exports.getUserTests = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: "Missing user ID" });
        }

        const userTests = await UserTest.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Test,
                    include: [
                        { model: CategoryName, attributes: ["name"] },
                        { model: TestType, attributes: ["type_name"] },
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
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserTest = async (req, res) => {
    try {
        const UserTestId = req.params.testId;
        (console.log(UserTestId));
        if (!UserTestId) {
            return res.status(400).json({ message: 'Test ID is required' });
        }

        const test = await UserTest.findOne({ where: { id: UserTestId } });
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        (console.log(test.test_id));
        const testQuestions = await TestQuestion.findAll({ where: { test_id: test.test_id } });

        const questionIds = testQuestions.map(testQuestion => testQuestion.question_id);

        res.status(200).json({
            testId: test.id,
            status: test.status,
            questionIds: questionIds,
            amount: testQuestions.length,
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the test and questions', error: error });
    }
};

exports.startTest = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userTestId = req.params.userTestId;

        if (!userId || !userTestId) {
            return res.status(400).json({ message: 'User ID and user test ID are required' });
        }

        const userTest = await UserTest.findOne({ where: { id: userTestId } });
        if (!userTest) {
            return res.status(404).json({ message: 'User test not found' });
        }

        if (userTest.status === 'Started') {
            return res.status(200).json({ message: 'Test has already been started' });
        }

        if (userTest.status === 'Finished') {
            return res.status(400).json({ message: 'Test has already been started' });
        }

        await userTest.update({ status: 'Started' });
        await userTest.update({ started_at: new Date() });

        res.status(200).json({ message: 'Test started' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while starting the test', error: error });
        console.log(error);
    }
}

exports.finishTest = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userTestId = req.params.userTestId;

        if (!userId || !userTestId) {
            return res.status(400).json({ message: 'User ID and user test ID are required' });
        }

        const userTest = await UserTest.findOne({ where: { id: userTestId } });
        if (!userTest) {
            return res.status(404).json({ message: 'User test not found' });
        }

        if (userTest.status !== 'Started') {
            return res.status(400).json({ message: 'Test has not been started' });
        }

        if (userTest.status === 'Finished') {
            return res.status(400).json({ message: 'Test has already been finished' });
        }

        await userTest.update({ status: 'finished' });
        await userTest.update({ finished_at: new Date() });

        res.status(200).json({ message: 'Test finished' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while finishing the test', error: error });
    }
}
