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

router.patch("/", async (req, res) => {
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    if (req.me.ID != req.user.ID) return responseManager(req, res, responsesEnum.UNAUTHORIZED);

    let body = req.body;
    let isThereChanges = false;
    let inbox = await DBModels.notificationsInbox.findOne({
        "where": {
            "UserID": req.me.ID
        }
    });

    if (body.unread) {
        if (typeof body.unread != "number") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);
        if (0 > body.unread) return responseManager(req, res, responsesEnum.INVALID_INBOX_UNREAD_PARAM);

        const notificationsCount = await DBModels.notifications.count({
            where: {
                "TO": inbox["ID"]
            }
        });

        if (notificationsCount < body.unread) return responseManager(req, res, responsesEnum.INVALID_INBOX_UNREAD_PARAM);

        inbox["Unread"] = body.unread;
        isThereChanges = true;
    };

    if (!isThereChanges) return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);

    await inbox.save();

    responseManager(req, res, responsesEnum.CHAT_SUCCESSFULLY_UPDATE);
});

module.exports = router;