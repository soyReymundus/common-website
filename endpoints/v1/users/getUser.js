const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const emailManager = require("../../../utils/emailManager.js");
const DBTables = require("../../../constants/DBTables.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.use((req, res, next) => {
    if (req.method != "GET" && req.method != "HEAD" && req.method != "DELETE" && req.method != "PATCH") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.get("/", async (req, res) => {
    let user = {
        "ID": req.user["ID"],
        "username": req.user["Username"],
        "displayName": req.user["DisplayName"],
        "photo": req.user["Photo"],
        "banner": req.user["Banner"],
        "description": req.user["Description"],
        "permissions": req.user["Permissions"],
        "birthDate": req.user["BirthDate"],
        "firstName": req.user["FirstName"],
        "lastName": req.user["LastName"]
    };

    if (req.me && req.me.ID == req.user.ID) {
        user["email"] = req.user["Email"];

        user["outcomingFriendRequests"] = (await DBManager.find(DBTables.USERS_FRIEND_REQUESTS, {
            "FROM": req.me.ID
        }, {
            "elements": ["*"],
            "limit": -1
        })).map((fr) => {
            return fr.TO
        });

        user["incomingFriendRequests"] = (await DBManager.find(DBTables.USERS_FRIEND_REQUESTS, {
            "TO": req.me.ID
        }, {
            "elements": ["*"],
            "limit": -1
        })).map((fr) => {
            return fr.FROM
        });

        user["blockedAccounts"] = (await DBManager.find(DBTables.USERS_BLOCKS, {
            "FROM": req.me.ID
        }, {
            "elements": ["*"],
            "limit": -1
        })).map((fr) => {
            return fr.TO
        });

        user["friends"] = (await DBManager.find(DBTables.USERS_FRIENDS, {
            "User": req.me.ID,
            "User2": req.me.ID
        }, {
            "elements": ["*"],
            "limit": -1,
            "useOR": true
        })).map((friendship) => {
            if (friendship.User == req.me.ID) {
                return friendship.User2;
            }else{
                return friendship.User;
            };
        });
    };

    responseManager(req, res, responsesEnum.USER_SUCCESSFULLY_RETRIEVE, {
        user
    });
});

module.exports = router;