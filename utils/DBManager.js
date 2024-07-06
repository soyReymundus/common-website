const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env["MYSQL_DATABASE"], process.env["MYSQL_USERNAME"], process.env["MYSQL_PASSWORD"], {
    host: process.env["MYSQL_HOST"],
    port: process.env["MYSQL_PORT"],
    pool: {
        "max": parseInt(process.env["MYSQL_CONNECTION_LIMIT"])
    },
    dialect: 'mysql'
});

module.exports = sequelize;