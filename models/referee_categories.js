const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const RefereeCategory = sequelize.define("RefereeCategory", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "users",
            key: "id",
        },
    },
    category_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "category_names",
            key: "id",
        },
    },
    assigned_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    valid_until: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: "referee_categories",
    underscored: true,
    timestamps: true
});

module.exports = RefereeCategory;
