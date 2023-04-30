const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Role',
    }
);

module.exports = Role;
