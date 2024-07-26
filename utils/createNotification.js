const { Op } = require('sequelize');
const DBModels = require("../constants/DBModels.js");

module.exports = (from, to, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (from == to) return;

            let i = await DBModels.notificationsInbox.findOne({
                "where": {
                    "UserID": to
                }
            });

            if (i == null) return;

            let n = await DBModels.notifications.create({
                "FROM": from,
                "TO": i["ID"],
                "Type": type,
                "CreationDate": Date.now()
            });

            resolve(n);
        } catch (e) {
            reject(e);
        };
    });
};