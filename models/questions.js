const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    question_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    difficulty_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "difficulty_levels",
            key: "id",
        },
    },
    media_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "media",
            key: "id",
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: "questions",
    underscored: true,
    timestamps: true
});

module.exports = Question;
