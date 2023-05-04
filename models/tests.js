const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Test = sequelize.define("Test", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        test_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "category_names",
                key: "id",
            },
        },
        total_questions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type:
            DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        test_type_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "test_types",
                key: "id",
            },
        }
    },
    options = {
        tableName: "tests",
        underscored: true,
        timestamps: true
    });

module.exports = Test;