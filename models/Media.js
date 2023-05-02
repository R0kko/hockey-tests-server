const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Media extends Model {}

Media.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        file_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        file_type: {
            type: DataTypes.ENUM('image', 'video'),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updated_at'
        }
    },
    {
        sequelize,
        modelName: 'Media',
        tableName: 'media',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = Media;
