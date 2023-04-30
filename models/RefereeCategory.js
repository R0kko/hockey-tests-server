const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database');

class RefereeCategory extends Model {
}

RefereeCategory.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'category_names',
                key: 'id',
            },
        },
        assigned_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },

        valid_until: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'RefereeCategory',
        tableName: 'referee_categories'
    }
);

module.exports = RefereeCategory;