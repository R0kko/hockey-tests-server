const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class TestType extends Model {}

TestType.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        type_name: {
            type: DataTypes.STRING,
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
        modelName: 'TestType',
        tableName: 'test_types',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = TestType;
