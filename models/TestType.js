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
    },
    {
        sequelize,
        modelName: 'TestType',
        tableName: 'test_types',
    }
);

module.exports = TestType;
