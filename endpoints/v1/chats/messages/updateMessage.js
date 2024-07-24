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

router.patch("/", async (req, res) => {
    if (req.me.ID != req.message.UserID) return responseManager(req, res, responsesEnum.UNAUTHORIZED);
    let body = req.body;
    let isThereChanges = false;

    if (body.content) {
        if (typeof body.content != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);
        if (1 > body.content.length || 2000 < body.content.length) return responseManager(req, res, responsesEnum.INVALID_MESSAGE_CONTENT);

        req.message["Content"] = body.content;
        isThereChanges = true;
    };

    if (!isThereChanges) return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);

    req.message["LastUpdate"] = Date.now();

    await req.message.save();

    responseManager(req, res, responsesEnum.MESSAGE_SUCCESSFULLY_UPDATE);
});

module.exports = router;