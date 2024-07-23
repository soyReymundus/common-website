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

router.get("/", async (req, res) => {
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    let where = {};
    let offset = 0;

    if (req.query["offset"]) {
        offset = parseInt(req.query["offset"]);

        if (isNaN(offset)) offset = 0;
    };

    if (req.query["ignore"]) {
        let IDs = searchUtilities.parseQuery(req.query["ignore"], searchUtilities.dataTypes.NUMBER);

        if (IDs != null) where["ID"] = {
            [Op.notIn]: IDs
        };
    };

    where["Status"] = {
        [Op.notIn]: [statusEnum.chats.HIDDEN]
    };

    let rawChats = await DBModels.chats.findAll({
        "include": [{
            "model": DBModels.chatParticipants,
            "as": "ChatParticipants",
            "where": {
                "UserID": req.me.ID,
                "Closed": false
            }
        }],
        "order": [
            ['LastMessage', 'DESC']
        ],
        "where": where,
        "limit": 8,
        "offset": offset
    });

    let chats = [];

    for (let index = 0; index < rawChats.length; index++) {
        const rawChat = rawChats[index];

        let participants = await DBModels.chatParticipants.findAll({
            "where": {
                "ChatID": rawChat["ID"]
            }
        });

        chats.push(await extractInfo.chat(rawChat, participants, req.me.ID));
    };

    responseManager(req, res, responsesEnum.CHATS_SUCCESSFULLY_RETRIEVED, {
        chats: chats
    });
});

module.exports = router;