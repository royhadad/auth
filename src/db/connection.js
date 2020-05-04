const chalk = require('chalk');
const mysql = require('mysql');
const con = mysql.createConnection({
    host: process.env.DB_CONNECTION_URL,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

con.connect((err) => {
    if (err) {
        throw err;
    }

    //creating the database
    con.query('CREATE DATABASE IF NOT EXISTS auth;');
    con.query('USE auth;');
    con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, email varchar(255), password_hash varchar(255), salt varchar(255), token varchar(255), PRIMARY KEY(id));', (error, result, fields) => {
        if (error) {
            throw error;
        }
    });
    console.log(chalk.green("Connected!"));
    con.end();
});