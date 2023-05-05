const User = require("./users");
const Role = require("./roles");
const CategoryName = require("./category_names");
const DifficultyLevel = require("./difficulty_levels");
const Media = require("./media");
const Question = require("./questions");
const RefereeCategory = require("./referee_categories");
const TestType = require("./test_types");
const Test = require("./tests");
const UserAnswer = require("./user_answers");
const UserTest = require("./user_tests");
const Answer = require("./answers");
const TestQuestion = require("./test_question");

User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

RefereeCategory.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(RefereeCategory, { foreignKey: "user_id" });

RefereeCategory.belongsTo(CategoryName, { foreignKey: "category_id" });
CategoryName.hasMany(RefereeCategory, { foreignKey: "category_id" });

Question.belongsTo(DifficultyLevel, { foreignKey: "difficulty_id" });
DifficultyLevel.hasMany(Question, { foreignKey: "difficulty_id" });

Question.belongsTo(Media, { foreignKey: "media_id" });
Media.hasOne(Question, { foreignKey: "media_id" });

Answer.belongsTo(Question, { foreignKey: "question_id" });
Question.hasMany(Answer, { foreignKey: "question_id" });

Test.belongsTo(CategoryName, { foreignKey: "category_id" });
CategoryName.hasMany(Test, { foreignKey: "category_id" });

Test.belongsTo(TestType, { foreignKey: "test_type_id" });
TestType.hasMany(Test, { foreignKey: "test_type_id" });

UserTest.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(UserTest, { foreignKey: "user_id" });

UserTest.belongsTo(Test, { foreignKey: "test_id" });
Test.hasMany(UserTest, { foreignKey: "test_id" });

UserAnswer.belongsTo(UserTest, { foreignKey: "user_test_id" });
UserTest.hasMany(UserAnswer, { foreignKey: "user_test_id" });

UserAnswer.belongsTo(Question, { foreignKey: "question_id" });
Question.hasMany(UserAnswer, { foreignKey: "question_id" });

UserAnswer.belongsTo(Answer, { foreignKey: "answer_id" });
Answer.hasMany(UserAnswer, { foreignKey: "answer_id" });

Test.belongsToMany(Question, { through: TestQuestion, foreignKey: 'test_id' });
Question.belongsToMany(Test, { through: TestQuestion, foreignKey: 'question_id' });

module.exports = {
    User,
    Role,
    CategoryName,
    DifficultyLevel,
    Media,
    Question,
    RefereeCategory,
    TestType,
    Test,
    UserAnswer,
    UserTest,
    Answer,
    TestQuestion
};