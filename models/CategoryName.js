const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class CategoryName extends Model {}

CategoryName.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'CategoryName',
    }
);

module.exports = CategoryName;
