const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const parser = require('accept-language-parser');
const extractInfo = require("../../../../utils/extractInfo.js");
const DBManager = require("../../../../utils/DBManager.js");
const emailManager = require("../../../../utils/emailManager.js");
const DBModels = require("../../../../constants/DBModels.js");
const statusEnum = require("../../../../constants/statusEnum.js");
const checkUserStatus = require("../../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../../constants/responsesEnum.js");
const responseManager = require("../../../../utils/responseManager.js");
const emailResponses = require("../../../../constants/emailResponses.js");
const relationshipsChecker = require("../../../../utils/relationshipsChecker.js");

router.get("/", async (req, res) => {
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    if (req.me.ID != req.user.ID) return responseManager(req, res, responsesEnum.UNAUTHORIZED);
    let offset = 0;

    if (req.query["offset"]) {
        offset = parseInt(req.query["offset"]);

        if (isNaN(offset)) offset = 0;
    };

    let inbox = await DBModels.notificationsInbox.findOne({
        "where": {
            "UserID": req.me.ID
        }
    });

    let notis = await DBModels.notifications.findAll({
        "where": {
            "TO": inbox["ID"]
        },
        "limit": 8,
        "offset": offset,
        "order": [
            ['CreationDate', 'DESC']
        ]
    });

    responseManager(req, res, responsesEnum.INBOX_SUCCESSFULLY_RETRIEVED, {
        inbox: await extractInfo.inbox(inbox, notis)
    });
});

module.exports = router;