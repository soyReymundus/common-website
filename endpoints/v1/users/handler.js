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

router.param('user', async (req, res, next, user) => {
    let query2Db = {};

    if (user.startsWith("@")) {
        user = user.slice(1);

        if (req.me && req.me.Username == user) {
            req.user = req.me;

            return next();
        };

        query2Db = {
            "Username": user
        };
    } else {
        if (user == "me") {
            if (!req.me) return responseManager(req, res, responsesEnum.NEED_TO_LOG_IN_TO_SEE_YOURSELF);
            req.user = req.me;

            return next();
        };

        if (isNaN(parseInt(user))) return responseManager(req, res, responsesEnum.USER_NOT_FOUND);

        if (req.me && req.me.ID == user) {
            req.user = req.me;

            return next();
        };

        query2Db = {
            "ID": user
        };
    };

    let u = await DBModels.users.findOne({
        "where": query2Db
    });

    if (u == null) return responseManager(req, res, responsesEnum.USER_NOT_FOUND);

    if (u["Status"] == statusEnum.users["BANNED"]) {
        if (
            (req.path != "/" + u.ID && req.path != "/@" + u.Username)
            ||
            (req.method != "GET" && req.method != "HEAD")
        ) return responseManager(req, res, responsesEnum.USER_BANNED);
    };

    if (u["Status"] == statusEnum.users["DELETED"]) {
        if (
            (req.path != "/" + u.ID && req.path != "/@" + u.Username)
            ||
            (req.method != "GET" && req.method != "HEAD")
        ) return responseManager(req, res, responsesEnum.USER_DELETED);
    };

    req.user = u;

    next();
});

router.use("/:user/relationship", require("./userRelationship.js"));
router.use("/:user", require("./getUser.js"));
router.use("/:user", require("./deleteUser.js"));
router.use("/:user", require("./updateUser.js"));
router.use("/", require("./getUsers.js"));

//BLANK PAGE
router.get("/", (req, res) => {
    responseManager(req, res, responsesEnum.OK);
});

module.exports = router;