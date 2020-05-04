const chalk = require('chalk');
const mysql = require('mysql/promise');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'auth',
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_CONNECTION_URL,
        dialect: 'mysql'
    });

try {
    await sequelize.authenticate();
    console.log(chalk.green('connected!'));
} catch (e) {
    console.log(chalk.red('unable to connect to DB:', e));
}

module.exports = sequelize;