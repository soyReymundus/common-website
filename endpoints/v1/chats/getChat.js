const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const extractInfo = require("../../../utils/extractInfo.js");
const emailManager = require("../../../utils/emailManager.js");
const DBModels = require("../../../constants/DBModels.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.get("/", async (req, res) => {
    let privilege = false;
    let chatData;
    let responseNumber = responsesEnum.CHAT_SUCCESSFULLY_RETRIEVED;

    if (!privilege && req.chat["Status"] == statusEnum.chats["HIDDEN"]) {
        responseNumber = responsesEnum.CHAT_HIDDEN;

        let reason = await DBModels.chatsPunishments.findOne({
            "where": {
                ChatID: req.chat.ID,
                Removed: false
            }
        });

        if (reason.LegalPunishment) responseNumber = responsesEnum.CHAT_CENSORED;

        chatData = await extractInfo.limitedChat(req.chat);
    } else {
        chatData = await extractInfo.chat(req.chat, req.chatParticipants, req.me.ID);
    };

    responseManager(req, res, responseNumber, {
        chat: chatData
    });
});

module.exports = router;