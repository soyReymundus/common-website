const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const EmailSender = require("../../../utils/EmailSender.js");
const DBTables = require("../../../constants/DBTables.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.param('user', async (req, res, next, user) => {
    let query2Db = {};

    if (user.startsWith("@")) {
        user = user.slice(1);

        if (user == "me") {
            if (!req.me) return responseManager(req, res, responsesEnum.NEED_TO_LOG_IN_TO_SEE_YOURSELF);
            req.user = req.me;

            return next();
        };

        if (req.me && req.me.Username == user) {
            req.user = req.me;

            return next();
        };

        query2Db = {
            "Username": user
        };
    } else {
        if (isNaN(parseInt(user))) return responseManager(req, res, responsesEnum.USER_NOT_FOUND);

        if (req.me && req.me.ID == user) {
            req.user = req.me;

            return next();
        };

        query2Db = {
            "ID": user
        };
    };

    let u = await DBManager.find(DBTables.USERS, query2Db);

    if (u == null) return responseManager(req, res, responsesEnum.USER_NOT_FOUND);

    req.user = u;

    next();
});

router.use("/", require("./"));

router.use((req, res, next) => {
    if (req.method != "GET") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

//BLANK PAGE
router.get("/", (req, res) => {
    responseManager(req, res, responsesEnum.OK);
});

module.exports = router;