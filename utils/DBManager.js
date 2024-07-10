const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env["MYSQL_DATABASE"], process.env["MYSQL_USERNAME"], process.env["MYSQL_PASSWORD"], {
    host: process.env["MYSQL_HOST"],
    port: process.env["MYSQL_PORT"],
    pool: {
        acquire: 30000,
        idle: 120000,
        min: parseInt(process.env["MYSQL_CONNECTIONS_MIN"]),
        max: parseInt(process.env["MYSQL_CONNECTIONS_MAX"])
    },
    dialect: 'mysql',
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true
        }
    }
});

sequelize.authenticate()
    .catch((e) => {
        throw e;
    });

module.exports = sequelize;