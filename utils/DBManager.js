var mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit: parseInt(process.env["MYSQL_CONNECTION_LIMIT"]),
    host: process.env["MYSQL_HOST"],
    port: process.env["MYSQL_PORT"],
    user: process.env["MYSQL_USERNAME"],
    password: process.env["MYSQL_PASSWORD"],
    database: process.env["MYSQL_DATABASE"]
});

/**
 * 
 * @param {String} table 
 * @param {any} query 
 * @returns {Promise<void>}
 */
function create(table, query) {
    return new Promise((resolve, reject) => {
        let SQLquery = `INSERT INTO ${table} ${SQLValuesGenerator(query, table)};`;

        connection.query(SQLquery, (error, results, fields) => {
            if (error) return reject(error);

            return resolve();
        });
    });
};


/**
 * 
 * @param {String} table 
 * @param {any} query 
 * @param {{ useOR: Boolean }} config 
 * @returns {any | any[]}
 */
function findAndDetele(table, query, config = {
    "useOR": false
}) {
    return new Promise((resolve, reject) => {
        let SQLquery = `DELETE FROM ${table} ${SQLWhereGenerator(query, table, config.useOR)};`;

        connection.query(SQLquery, (error, results, fields) => {
            if (error) return reject(error);

            if (results.length == 0) return resolve(null);

            return resolve(results[0]);
        });
    });
};

/**
 * 
 * @param {String} table 
 * @param {any} query 
 * @param {any} data 
 * @param {{ useOR: Boolean }} config 
 * @returns {any | any[]}
 */
function findAndUpdate(table, query, data, config = {
    "useOR": false
}) {
    return new Promise((resolve, reject) => {
        let SQLquery = `UPDATE ${table} ${SQLSetGenerator(data)} ${SQLWhereGenerator(query, table, config.useOR)};`;

        connection.query(SQLquery, (error, results, fields) => {
            if (error) return reject(error);

            if (results.length == 0) return resolve(null);

            return resolve(results[0]);
        });
    });
};

/**
 * 
 * @param {String} table 
 * @param {any} query 
 * @param {{limit: Number, elements: String[], useOR: Boolean}} config 
 * @returns {any | any[]}
 */
function find(table, query, config = {
    "limit": 1,
    "elements": ["*"],
    "useOR": false
}) {
    return new Promise((resolve, reject) => {
        let SQLquery = `SELECT ${config.elements.join(", ")} FROM ${table} ${SQLWhereGenerator(query, table, config.useOR)}`;
        if (config.limit > 0) SQLquery += ` LIMIT ${config.limit}`;

        SQLquery += `;`;

        connection.query(SQLquery, (error, results, fields) => {
            if (error) return reject(error);

            if (config.limit == 1) {
                if (results.length == 0) return resolve(null);

                return resolve(results[0]);
            } else {
                if (results.length == 0) return resolve([]);

                return resolve(results);
            };
        });
    });
};





/**
 * 
 * @param {{}} data 
 * @returns {String}
 */
function SQLSetGenerator(data) {
    if (typeof data == "undefined") return "";
    let dataKeys = Object.keys(data);
    let SQLdata = [];

    for (let index = 0; index < dataKeys.length; index++) {
        let dataKey = dataKeys[index];
        let rawValue = data[dataKey];
        let value;

        value = parseValues(rawValue);

        SQLdata.push(`${dataKey} = ${value}`);
    };

    return `SET ${SQLdata.join(", ")}`;
};

function parseValues(rawValue) {
    switch (typeof rawValue) {
        case "string":
            return connection.escape(rawValue);
            break;
        case "number":
            return connection.escape(rawValue);
            break;
        case "boolean":
            return rawValue ? 1 : 0;
            break;
        default:
            if (rawValue == null) {
                return "NULL";
            } else {
                return "'" + rawValue + "'";
            };
            break;
    };
};

/**
 * 
 * @param {{}} query 
 * @returns {String}
 */
function SQLWhereGenerator(query, table, useOR = false) {
    if (typeof query == "undefined") return "";
    let queryKeys = Object.keys(query);
    let SQLQuerys = [];

    for (let index = 0; index < queryKeys.length; index++) {
        let queryKey = queryKeys[index];
        let queryValue = query[queryKey];

        queryKey = table + "." + queryKey;


        if (typeof queryValue == "string" || typeof queryValue == "number" || typeof queryValue == "bigint") queryValue = {
            "$eq": queryValue
        };

        if (typeof queryValue == "boolean") queryValue = {
            "$eq": queryValue ? 1 : 0
        };

        let operators = Object.keys(queryValue);

        for (let index = 0; index < operators.length; index++) {
            const operator = operators[index];
            const value = queryValue[operators[index]];

            switch (operator) {
                case "$eq":
                    SQLQuerys.push(`${queryKey} = ${connection.escape(value)}`);
                    break;
                case "$gt":
                    SQLQuerys.push(`${queryKey} > ${connection.escape(value)}`);
                    break;
                case "$lt":
                    SQLQuerys.push(`${queryKey} < ${connection.escape(value)}`);
                    break;
                default:
                    throw new Error("Unvalid logic operator");
                    break;
            };
        };
    };

    let operator = useOR ? "OR" : "AND";
    return `WHERE ${SQLQuerys.join(` ${operator} `)}`;
};



/**
 * 
 * @param {any} query 
 * @returns {String}
 */
function SQLValuesGenerator(query, table) {
    if (typeof query == "undefined") return "";
    let queryKeys = Object.keys(query).map((key) => {
        return table + "." + key;
    });
    let SQLValues = Object.values(query).map((rawValue) => {
        return parseValues(rawValue)
    });

    return `(${queryKeys.join(", ")}) VALUES (${SQLValues.join(", ")})`;
};

module.exports = {
    create,
    findAndDetele,
    findAndUpdate,
    find
};