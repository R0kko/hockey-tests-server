const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const UserAnswer = sequelize.define("UserAnswer", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        user_test_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "user_tests",
                key: "id",
            },
        },
        question_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "questions",
                key: "id",
            },
        },
        answer_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "answers",
                key: "id",
            },
        },
        is_correct: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    options = {
        tableName: "user_answers",
        underscored: true,
        timestamps: true
    });

module.exports = UserAnswer;