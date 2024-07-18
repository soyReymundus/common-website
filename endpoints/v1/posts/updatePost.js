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
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    if (req.me.ID != req.post.UserID) return responseManager(req, res, responsesEnum.UNAUTHORIZED);
    let body = req.body;
    let post = {};
    let isThereChanges = false;

    if (body.title) {
        if (typeof body.title != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);
        if (3 > body.title.length || 32 < body.title.length) return responseManager(req, res, responsesEnum.INVALID_TITLE);

        req.post["Title"] = body.title;
        isThereChanges = true;
    };

    if (body.content) {
        if (typeof body.content != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);
        if (5 > body.content.length || 3000 < body.content.length) return responseManager(req, res, responsesEnum.INVALID_CONTENT);

        req.post["Content"] = body.content;
        isThereChanges = true;
    };

    if (!isThereChanges) return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);

    await req.post.save();

    responseManager(req, res, responsesEnum.POSTS_SUCCESSFULLY_UPDATED);
});

module.exports = router;