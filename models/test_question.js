const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const TestQuestion = sequelize.define('TestQuestion', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    test_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    question_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE
    }
}, {
    modelName: 'TestQuestion',
    tableName: 'test_questions',
    underscored: true
});

module.exports = TestQuestion;
