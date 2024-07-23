const sequelize = require('sequelize');
const { Op } = require('sequelize');
const DBManager = require("./DBManager.js");
const DBModels = require("../constants/DBModels.js");
const statusEnum = require("../constants/statusEnum.js");

module.exports.user = (user, privilegedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = {
                "ID": user["ID"],
                "username": user["Username"],
                "permissions": user["Permissions"],
                "birthDate": user["BirthDate"],
                "creationDate": user["CreationDate"]
            };

            if (user["FirstName"]) info["firstName"] = user["FirstName"];
            if (user["LastName"]) info["lastName"] = user["LastName"];
            if (user["Description"]) info["description"] = user["Description"];
            if (user["Photo"]) info["photo"] = user["Photo"];
            if (user["Banner"]) info["banner"] = user["Banner"];
            if (user["DisplayName"]) info["displayName"] = user["DisplayName"];

            if (privilegedData) {
                let contract = await DBModels.contracts.findOne({
                    "where": {
                        "ID": user["ContractID"]
                    }
                });

                info["contract"] = contract["HashName"];

                if (user["Language"]) info["language"] = user["Language"];
                if (user["Theme"]) info["theme"] = user["Theme"];
                if (user["Email"]) info["email"] = user["Email"];

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

module.exports.post = (post, privilegedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = {
                "ID": post["ID"],
                "userID": post["UserID"],
                "title": post["Title"],
                "content": post["Content"],
                "publicationDate": post["PublicationDate"]
            };

            if (post["PostID"]) info["postID"] = post["PostID"];
            if (post["LastUpdate"]) info["lastUpdate"] = post["LastUpdate"];

            const opinions = (await DBModels.postsOpinions.findAll({
                "attributes": [
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN IsLike = true THEN 1 ELSE 0 END')), 'Likes'],
                    [sequelize.fn('SUM', sequelize.literal('CASE WHEN IsLike = false THEN 1 ELSE 0 END')), 'Dislikes']
                ],
                "where": {
                    "PostID": post["ID"]
                }
            }))[0].dataValues;

            likes = parseInt(opinions["Likes"]);
            dislikes = parseInt(opinions["Dislikes"]);

            if (isNaN(likes)) {
                info["likes"] = 0
            } else {
                info["likes"] = likes
            };

            if (isNaN(dislikes)) {
                info["dislikes"] = 0
            } else {
                info["dislikes"] = dislikes
            };

            resolve(info);
        } catch (e) {
            reject(e);
        };
    });
};

module.exports.limitedPost = (post) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = {
                "ID": post["ID"],
                "postID": post["PostID"],
                "userID": post["UserID"],
                "publicationDate": post["PublicationDate"]
            };

            resolve(info);
        } catch (e) {
            reject(e);
        };
    });
};

module.exports.postOpinions = (post, offset) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = {};

            let opinionsUsers = await DBModels.postsOpinions.findAll({
                "where": {
                    "PostID": post["ID"]
                },
                "limit": 8,
                "offset": offset
            });

            info["likesUsers"] = opinionsUsers
                .filter((opn) => {
                    if (opn.IsLike) return true;
                })
                .map((opn) => {
                    return opn.UserID;
                });

            info["dislikesUsers"] = opinionsUsers
                .filter((opn) => {
                    if (!opn.IsLike) return true;
                }).map((opn) => {
                    return opn.UserID;
                });

            resolve(info);
        } catch (e) {
            reject(e);
        };
    });
};

module.exports.chat = (chat, participants, userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = {
                "ID": chat["ID"],
                "lastMessage": chat["LastMessage"],
                "participants": participants.map((p) => {
                    return p.UserID
                })
            };

            if (userID) {
                let index = participants.findIndex(p => p.UserID == userID);

                info["unread"] = participants[index]["Unread"];
                info["closed"] = participants[index]["Closed"];
            };

            resolve(info);
        } catch (e) {
            reject(e);
        };
    });
};

module.exports.limitedChat = (chat, participants, userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = {
                "ID": chat["ID"],
                "participants": participants.map((p) => {
                    return p.UserID
                })
            };

            resolve(info);
        } catch (e) {
            reject(e);
        };
    });
};