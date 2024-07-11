const { Op } = require('sequelize');
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
                "lastName": user["LastName"],
                "creationDate": user["CreationDate"]
            };

            if (privilegedData) {
                let contract = await DBModels.contracts.findOne({
                    "where": {
                        "ID": user["ContractID"]
                    }
                });

                info["contract"] = contract["HashName"];
                info["email"] = user["Email"];

                info["outgoingFriendRequests"] = (await DBModels.usersFriendRequests.findAll({
                    "where": {
                        "FROM": info.ID
                    }
                })).map((fr) => {
                    return fr.TO
                });

                info["incomingFriendRequests"] = (await DBModels.usersFriendRequests.findAll({
                    "where": {
                        "TO": info.ID
                    }
                })).map((fr) => {
                    return fr.FROM
                });

                info["blockedAccounts"] = (await DBModels.usersBlocks.findAll({
                    "WHERE": {
                        "FROM": info.ID
                    }
                })).map((fr) => {
                    return fr.TO
                });

                info["friends"] = (await DBModels.usersFriends.findAll({
                    "WHERE": {
                        [Op.or]: [
                            { User: info.ID },
                            { User2: info.ID }
                        ]
                    }
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

module.exports.limitedUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = {
                "ID": user["ID"],
                "username": user["Username"],
                "birthDate": user["BirthDate"],
                "creationDate": user["CreationDate"]
            };

            resolve(info);
        } catch (e) {
            reject(e);
        };
    });
};