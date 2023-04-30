const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Question extends Model {}

Question.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        question_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'question_categories',
                key: 'id',
            },
        },
        difficulty_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'difficulty_levels',
                key: 'id',
            },
        },
        media_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'media',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Question',
    }
);

module.exports = Question;
