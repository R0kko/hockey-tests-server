const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const TestType = require("./TestType");

class Test extends Model {}

Test.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        test_name: {
            type: DataTypes.STRING,
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
        test_type_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'test_types',
                key: 'id',
            },
        },
        total_questions: {
            type: DataTypes.INTEGER,
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
        modelName: 'Test',
        tableName: 'tests',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Test.belongsTo(TestType, { foreignKey: 'test_type_id', as: 'testType' });
TestType.hasMany(Test, { foreignKey: 'test_type_id' });

module.exports = Test;
