const { Op } = require('sequelize');
const DBModels = require("../constants/DBModels.js");

module.exports = (from, to, type) => {
    if (from == to) return;

    DBModels.notifications.create({
        "FROM": from,
        "TO": tO,
        "Type": type,
        "CreationDate": Date.now()
    });
};