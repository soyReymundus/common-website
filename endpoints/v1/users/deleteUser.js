const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const EmailSender = require("../../../utils/EmailSender.js");
const DBTables = require("../../../constants/DBTables.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.use(async (req, res, next) => {
    if (req.method != "DELETE") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.delete("/", async (req, res) => {
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    if (req.me.ID != req.user.ID) return responseManager(req, res, responsesEnum.UNAUTHORIZED);

    let date = new Date();
    let schedule = new Date(date.setMonth(date.getMonth() + 1));

    await DBManager.findAndUpdate(DBTables.USERS, {
        "ID": req.me.ID
    }, {
        DeletionDate: schedule.getTime()
    });

    return responseManager(req, res, responsesEnum.SUCCESSFUL_SCHEDULED_DELETION, {
        "deletionDate": schedule.getTime()
    });
});

module.exports = router;