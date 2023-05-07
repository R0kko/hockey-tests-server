const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const UserTest = sequelize.define("UserTest", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        test_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "tests",
                key: "id",
            },
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        active_from: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        active_to: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        started_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        finished_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    options = {
        tableName: "user_tests",
        underscored: true,
        timestamps: true
    });

module.exports = UserTest;
