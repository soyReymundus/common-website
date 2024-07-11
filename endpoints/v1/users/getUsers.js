const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const searchUtilities = require("../../../utils/searchUtilities.js");
const extractInfo = require("../../../utils/extractInfo.js");
const emailManager = require("../../../utils/emailManager.js");
const DBModels = require("../../../constants/DBModels.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.use((req, res, next) => {
    if (req.method != "GET" && req.method != "HEAD") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.get("/", async (req, res) => {
    let where = {};
    let or = [];

    if (req.query["username"]) {
        let queryParam = searchUtilities.parseQuery(req.query["username"]);

        if (queryParam != null) or.push(
            searchUtilities.likesGenerator(queryParam, "Username")
        );
    };

    if (req.query["description"]) {
        let queryParam = searchUtilities.parseQuery(req.query["description"]);

        if (queryParam != null) or.push(
            searchUtilities.likesGenerator(queryParam, "Description")
        );
    };

    if (req.query["displayName"]) {
        let queryParam = searchUtilities.parseQuery(req.query["displayName"]);

        if (queryParam != null) or.push(
            searchUtilities.likesGenerator(queryParam, "displayName")
        );
    };

    if (or.length != 0) where = {
        [Op.or]: or
    };

    if (req.query["ignore"]) {
        let IDs = searchUtilities.parseQuery(req.query["ignore"], searchUtilities.dataTypes.NUMBER);

        if (IDs != null) where["ID"] = {
            [Op.notIn]: IDs
        };
    };

    where["Status"] = {
        [Op.notIn]: [statusEnum.users.BANNED, statusEnum.users.DELETED]
    };

    let rawUsers = await DBModels.users.findAll({
        "where": where,
        "limit": 8
    });

    let users = [];

    for (let index = 0; index < rawUsers.length; index++) {
        const rawUser = rawUsers[index];
        let privilege = (req.me && req.me.ID == rawUser.ID);

        users.push(await extractInfo.user(rawUser, privilege));
    };

    responseManager(req, res, responsesEnum.USERS_SUCCESSFULLY_RETRIEVED, {
        users: users
    });
});

module.exports = router;