const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const DBManager = require("../../../../utils/DBManager.js");
const searchUtilities = require("../../../../utils/searchUtilities.js");
const extractInfo = require("../../../../utils/extractInfo.js");
const emailManager = require("../../../../utils/emailManager.js");
const DBModels = require("../../../../constants/DBModels.js");
const statusEnum = require("../../../../constants/statusEnum.js");
const checkUserStatus = require("../../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../../constants/responsesEnum.js");
const responseManager = require("../../../../utils/responseManager.js");
const emailResponses = require("../../../../constants/emailResponses.js");

router.get("/", async (req, res) => {
    let where = {};
    let offset = 0;
    let or = [];

    if (req.query["offset"]) {
        offset = parseInt(req.query["offset"]);

        if (isNaN(offset)) offset = 0;
    };

    if (req.query["content"]) {
        let queryParam = searchUtilities.parseQuery(req.query["content"]);

        if (queryParam != null) or.push(
            searchUtilities.likesGenerator(queryParam, "Content")
        );
    };

    if (req.query["user"]) {
        let queryParam = searchUtilities.parseQuery(req.query["user"], searchUtilities.dataTypes.NUMBER);

        if (queryParam != null) or.push(
            searchUtilities.orsGenerator(queryParam, "UserID")
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

    where["ChatID"] = req.chat["ID"];

    let rawMessages = await DBModels.messages.findAll({
        "where": where,
        "limit": 8,
        "offset": offset
    });

    let messages = [];

    for (let index = 0; index < rawMessages.length; index++) {
        const rawMessage = rawMessages[index];

        messages.push(await extractInfo.message(rawMessage));
    };

    responseManager(req, res, responsesEnum.MESSAGES_SUCCESSFULLY_RETRIEVED, {
        messages: messages
    });
});

module.exports = router;