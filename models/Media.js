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
    },
    {
        sequelize,
        modelName: 'Media',
    }
);

module.exports = Media;
