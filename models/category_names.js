const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const CategoryName = sequelize.define("CategoryName", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
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
    tableName: "category_names",
    underscored: true,
    timestamps: true
});

module.exports = CategoryName;
