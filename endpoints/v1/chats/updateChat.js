const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const parser = require('accept-language-parser');
const DBManager = require("../../../utils/DBManager.js");
const emailManager = require("../../../utils/emailManager.js");
const DBModels = require("../../../constants/DBModels.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.patch("/", async (req, res) => {
    let body = req.body;
    let isThereChanges = false;
    let index = req.participants.findIndex(p => p.UserID == userID);
    let chatInfo =  req.participants[index];


    if (body.closed) {
        if (typeof body.closed != "boolean") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);
        
        chatInfo["Closed"] = body.closed;
        isThereChanges = true;
    };

    if (body.unread) {
        if (typeof body.content != "number") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);
        if (0 > body.unread) return responseManager(req, res, responsesEnum.INVALID_UNREAD_PARAM);
        
        const messageCount = await DBModels.message.count({
            where: {
                ChatID: req.chat.ID
            }
        });

        if (messageCount < body.unread) return responseManager(req, res, responsesEnum.INVALID_UNREAD_PARAM);

        chatInfo["Unread"] = body.unread;
        isThereChanges = true;
    };

    if (!isThereChanges) return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);

    await chatInfo.save();

    responseManager(req, res, responsesEnum.CHAT_SUCCESSFULLY_UPDATE);
});

module.exports = router;