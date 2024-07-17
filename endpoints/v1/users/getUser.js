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
    let privilege = (req.me && req.me.ID == req.user.ID);
    let userData;
    let responseNumber = responsesEnum.USER_SUCCESSFULLY_RETRIEVED;

    if (!privilege && req.user["Status"] == statusEnum.users["DELETED"]) {
        responseNumber = responsesEnum.USER_DELETED;
        userData = await extractInfo.limitedUser(req.user);
    } else if (!privilege && req.user["Status"] == statusEnum.users["BANNED"]) {
        responseNumber = responsesEnum.USER_BANNED;
        userData = await extractInfo.limitedUser(req.user);
    } else {
        userData = await extractInfo.user(req.user, privilege);
    };

    responseManager(req, res, responseNumber, {
        user: userData
    });
});

module.exports = router;