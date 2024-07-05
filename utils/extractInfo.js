const DBManager = require("./DBManager.js");
const DBModels = require("../constants/DBModels.js");

module.exports.user = (user, privilegedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = {
                "ID": user["ID"],
                "username": user["Username"],
                "displayName": user["DisplayName"],
                "photo": user["Photo"],
                "banner": user["Banner"],
                "description": user["Description"],
                "permissions": user["Permissions"],
                "birthDate": user["BirthDate"],
                "firstName": user["FirstName"],
                "lastName": user["LastName"]
            };

            if (privilegedData) {
                info["email"] = user["Email"];

                info["outcomingFriendRequests"] = (await DBManager.find(DBModels.USERS_FRIEND_REQUESTS, {
                    "FROM": info.ID
                }, {
                    "elements": ["*"],
                    "limit": -1
                })).map((fr) => {
                    return fr.TO
                });

                info["incomingFriendRequests"] = (await DBManager.find(DBModels.USERS_FRIEND_REQUESTS, {
                    "TO": info.ID
                }, {
                    "elements": ["*"],
                    "limit": -1
                })).map((fr) => {
                    return fr.FROM
                });

                info["blockedAccounts"] = (await DBManager.find(DBModels.USERS_BLOCKS, {
                    "FROM": info.ID
                }, {
                    "elements": ["*"],
                    "limit": -1
                })).map((fr) => {
                    return fr.TO
                });

                info["friends"] = (await DBManager.find(DBModels.USERS_FRIENDS, {
                    "User": info.ID,
                    "User2": info.ID
                }, {
                    "elements": ["*"],
                    "limit": -1,
                    "useOR": true
                })).map((friendship) => {
                    if (friendship.User == info.ID) {
                        return friendship.User2;
                    } else {
                        return friendship.User;
                    };
                });
            };

            resolve(info);
        } catch (e) {
            reject(e);
        };
    });
};