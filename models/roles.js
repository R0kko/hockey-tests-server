const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    role_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: "roles",
    underscored: true,
    timestamps: true
});

module.exports = Role;
