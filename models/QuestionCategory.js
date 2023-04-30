const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class QuestionCategory extends Model {}

QuestionCategory.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        category_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'QuestionCategory',
    }
);

module.exports = QuestionCategory;