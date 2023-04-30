const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class DifficultyLevel extends Model {}

DifficultyLevel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        level_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'DifficultyLevel',
    }
);

module.exports = DifficultyLevel;
