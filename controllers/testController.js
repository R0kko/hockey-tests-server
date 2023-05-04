// Import required models and Sequelize instance
const { UserTest, Test, CategoryName, TestType } = require("../models/associations");

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
