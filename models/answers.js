const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Answer = sequelize.define("Answer", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    question_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "questions",
            key: "id",
        },
    },
    answer_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: "answers",
    underscored: true,
    timestamps: true
});

module.exports = Answer;
