const DBManager = require("../utils/DBManager.js");
const DBTables = require("../constants/DBTables.js");
const statusEnum = require("../constants/statusEnum.js");
const responsesEnum = require("../constants/responsesEnum.js");
const responseManager = require("../utils/responseManager.js");

module.exports = (req, res, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            switch (user.Status) {
                case statusEnum.users.NEED_ACTIONS:
                    responseManager(req, res, responsesEnum.NOT_EMAIL_VERIFICATION);

                    resolve(false);
                    break;
                case statusEnum.users.DELETED:
                    responseManager(req, res, responsesEnum.DELETED_ACCOUNT);

                    resolve(false);
                    break;
                case statusEnum.users.BANNED:
                    let userPunishment = await DBManager.find(DBTables.USERS_PUNISHMENTS, {
                        "UserID": user.ID,
                        "Ended": false
                    });

                    if (userPunishment == null) {
                        responseManager(req, res, responsesEnum.BANNED_ACCOUNT);
                    } else {
                        let resType = userPunishment.LegalPunishment == 1 ? responsesEnum.ILLEGAL_ACCOUNT : responsesEnum.BANNED_ACCOUNT;

                        responseManager(req, res, resType, {
                            "reason": userPunishment.Reason
                        });
                    };

                    resolve(false);
                    break;
                default:
                    resolve(true);
                    break;
            };
        } catch (e) {
            reject(e);
        };
    });
};