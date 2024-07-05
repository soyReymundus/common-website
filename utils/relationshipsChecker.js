const DBManager = require("../utils/DBManager.js");
const DBModels = require("../constants/DBModels.js");
const statusEnum = require("../constants/statusEnum.js");
const responsesEnum = require("../constants/responsesEnum.js");
const responseManager = require("../utils/responseManager.js");

function checkBlock(from, to) {
    return new Promise(async (resolve, reject) => {
        try {
            let block = await DBManager.find(DBModels.USERS_BLOCKS, {
                "FROM": from,
                "TO": to
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
            let req = await DBManager.find(DBModels.USERS_FRIEND_REQUESTS, {
                "FROM": from,
                "TO": to
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

function checkFriendRequest(from, to) {
    return new Promise(async (resolve, reject) => {
        try {
            let req = await DBManager.find(DBModels.USERS_FRIEND_REQUESTS, {
                "FROM": from,
                "TO": to
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
            let order = [user, user2].sort((a, b) => { return a - b });

            let req = await DBManager.find(DBModels.USERS_FRIENDS, {
                "User": order[0],
                "User2": order[1]
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