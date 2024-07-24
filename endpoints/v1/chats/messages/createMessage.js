const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const parser = require('accept-language-parser');
const DBManager = require("../../../../utils/DBManager.js");
const emailManager = require("../../../../utils/emailManager.js");
const DBModels = require("../../../../constants/DBModels.js");
const statusEnum = require("../../../../constants/statusEnum.js");
const checkUserStatus = require("../../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../../constants/responsesEnum.js");
const responseManager = require("../../../../utils/responseManager.js");
const emailResponses = require("../../../../constants/emailResponses.js");
const relationshipsChecker = require("../../../../utils/relationshipsChecker.js");

router.message("/", async (req, res) => {
    let body = req.body;
    let isValid = false;
    let now = Date.now()
    let message = {
        "UserID": req.me.ID,
        "ChatID": req.chat.ID,
        "PublicationDate": now
    };

    if (body.messageID) {
        if (typeof body.messageID != "number") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);
        let m = await DBModels.messages.findOne({
            "where": {
                "ID": body.messageID
            }
        });

        if (m == null) return responseManager(req, res, responsesEnum.INVALID_MESSAGEID);

        message["MessageID"] = body.messageID;
    };

    if (body.content) {
        if (typeof body.content != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);
        if (1 > body.content.length || 2000 < body.content.length) return responseManager(req, res, responsesEnum.INVALID_MESSAGE_CONTENT);

        message["Content"] = body.content;
        isValid = true;
    };

    if (body.attachments) {
        if (!Array.isArray(body.attachments)) return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);
        if (body.attachments.length > 4) return responseManager(req, res, responsesEnum.TOO_LARGE_ATTACHMENT);
        //coming soon

        message["Attachments"] = body.attachments;
        isValid = true;
    };

    if (!isValid) return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);

    await DBModels.messages.create(message);

    responseManager(req, res, responsesEnum.MESSAGE_SUCCESSFULLY_CREATED);

    req.chat["LastMessage"] = now;

    for (let index = 0; index < req.chatParticipants.length; index++) {
        const participant = req.chatParticipants[index];
        
        participant["Closed"] = false;
        participant["Unread"]++;

        participant.save();
    };
});

module.exports = router;