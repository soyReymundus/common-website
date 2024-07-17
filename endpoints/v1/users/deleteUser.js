const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const emailManager = require("../../../utils/emailManager.js");
const DBTables = require("../../../constants/DBModels.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.delete("/", async (req, res) => {
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    if (req.me.ID != req.user.ID) return responseManager(req, res, responsesEnum.UNAUTHORIZED);

    let date = new Date();
    let schedule = new Date(date.setMonth(date.getMonth() + 1));

    req.me.DeletionDate = schedule.getTime();
    req.me.PasswordResets = req.me.PasswordResets + 1;
    req.me.EmailResets = req.me.EmailResets + 1;
    await req.me.save();

    return responseManager(req, res, responsesEnum.SUCCESSFULLY_SCHEDULED_DELETION, {
        "deletionDate": schedule.getTime()
    });
});

module.exports = router;