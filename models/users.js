const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        patronymic: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        role_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "roles",
                key: "id",
            },
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    options = {
        tableName: "users",
        underscored: true,
        timestamps: true
    });

module.exports = User;
