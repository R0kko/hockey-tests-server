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
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updated_at'
        }
    },
    {
        sequelize,
        modelName: 'DifficultyLevel',
        tableName: 'difficulty_levels',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = DifficultyLevel;
