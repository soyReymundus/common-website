const DBManager = require("../utils/DBManager.js");
const { Op } = require('sequelize');
const DBModels = require("../constants/DBModels.js");
const statusEnum = require("../constants/statusEnum.js");
const responsesEnum = require("../constants/responsesEnum.js");
const responseManager = require("../utils/responseManager.js");

function checkBlock(from, to) {
    return new Promise(async (resolve, reject) => {
        try {
            let block = await DBModels.usersBlocks.findOne({
                "where": {
                    "FROM": from,
                    "TO": to
                }
            });

            if (block == null) {
                resolve(false);
            } else {
                resolve(true);
            };
        } catch (e) {
            reject(e);
        };
    });
};

function checkFriendRequest(from, to) {
    return new Promise(async (resolve, reject) => {
        try {
            let req = await DBModels.usersFriendRequests.findOne({
                "where": {
                    "FROM": from,
                    "TO": to
                }
            });

            if (req == null) {
                resolve(false);
            } else {
                resolve(true);
            };
        } catch (e) {
            reject(e);
        };
    });
};


function checkFriendship(user, user2) {
    return new Promise(async (resolve, reject) => {
        try {
            let req = await DBModels.usersFriends.findOne({
                "where": {
                    [Op.or]: [
                        { [Op.and]: [{ User: req.me.ID }, { User2: req.user.ID }] },
                        { [Op.and]: [{ User: req.user.ID }, { User2: req.me.ID }] }
                    ]
                }
            });

            if (req == null) {
                resolve(false);
            } else {
                resolve(true);
            };
        } catch (e) {
            reject(e);
        };
    });
};

module.exports = {
    checkBlock,
    checkFriendship,
    checkFriendRequest
};