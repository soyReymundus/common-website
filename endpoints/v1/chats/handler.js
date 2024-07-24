const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const emailManager = require("../../../utils/emailManager.js");
const DBModels = require("../../../constants/DBModels.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.param('chat', async (req, res, next, chat) => {
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    if (isNaN(parseInt(chat))) return responseManager(req, res, responsesEnum.CHAT_NOT_FOUND);

    let c = await DBModels.chats.findOne({
        "where": {
            "ID": chat
        }
    });

    if (c == null) return responseManager(req, res, responsesEnum.CHAT_NOT_FOUND);

    let participants = await DBModels.chatParticipants.findAll({
        "where": {
            "ChatID": c["ID"]
        }
    });

    if (!participants.some(participants => participants.UserID == req.me.ID)) return responseManager(req, res, responsesEnum.UNAUTHORIZED);

    if (c["Status"] == statusEnum.chats["HIDDEN"]) {
        if (
            (req.path != "/" + c["ID"])
            ||
            (req.method != "GET" && req.method != "HEAD")
        ) {
            let reason = await DBModels.chatsPunishments.findOne({
                "where": {
                    PostID: c["ID"],
                    Removed: false
                }
            });

            if (reason.LegalPunishment) return responseManager(req, res, responsesEnum.CHAT_CENSORED);

            return responseManager(req, res, responsesEnum.CHAT_HIDDEN);
        };
    };

    req.chatParticipants = participants;
    req.chat = c;

    next();
});

router.use("/:chat/messages", require("./messages/handler.js"));
router.use("/:chat", require("./chatHandler.js"));
router.use("/", require("./chatsHandler.js"));

//BLANK PAGE
router.get("/", (req, res) => {
    responseManager(req, res, responsesEnum.OK);
});

module.exports = router;