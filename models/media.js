const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Media = sequelize.define("Media", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    file_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    file_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    tableName: "media",
    underscored: true,
    timestamps: true
});

module.exports = Media;
