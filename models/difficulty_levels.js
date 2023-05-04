const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const DifficultyLevel = sequelize.define("DifficultyLevel", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    level_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: "difficulty_levels",
    underscored: true,
    timestamps: true
});

module.exports = DifficultyLevel;
