const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'default_db',
    process.env.DB_USER || 'gen_user',
    process.env.DB_PASSWORD || 'cr8xzd0tb4',
    {
        host: process.env.DB_HOST || '185.124.64.120',
        dialect: 'postgres',
        logging: false, // Set to true if you want to see SQL queries in the console
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;
