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

router.use((req, res, next) => {
    if (req.method != "GET" && req.method != "HEAD" && req.method != "DELETE" && req.method != "PATCH") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.get("/", async (req, res) => {
    let privilege = (req.me && req.me.ID == req.post.UserID);
    let postData;
    let responseNumber = responsesEnum.POST_SUCCESSFULLY_RETRIEVED;

    if (!privilege && req.post["Status"] == statusEnum.posts["DELETED"]) {
        responseNumber = responsesEnum.POST_DELETED;
        postData = await extractInfo.limitedPost(req.post);
    } else if (!privilege && req.post["Status"] == statusEnum.posts["HIDDEN"]) {
        responseNumber = responsesEnum.POST_HIDDEN;
        postData = await extractInfo.limitedPost(req.post);
    } else {
        postData = await extractInfo.post(req.post, privilege);
    };

    responseManager(req, res, responseNumber, {
        post: postData
    });
});

module.exports = router;