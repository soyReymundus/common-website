const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { createHash } = require("crypto");
const DBManager = require("../../../../utils/DBManager.js");
const emailManager = require("../../../../utils/emailManager.js");
const DBModels = require("../../../../constants/DBModels.js");
const statusEnum = require("../../../../constants/statusEnum.js");
const checkUserStatus = require("../../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../../constants/responsesEnum.js");
const responseManager = require("../../../../utils/responseManager.js");
const emailResponses = require("../../../../constants/emailResponses.js");

router.use((req, res, next) => {
    if (req.method != "GET" && req.method != "HEAD" && req.method != "PATCH") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.use(
    require("./getInbox.js"),
    require("./updateInbox.js")
);

//BLANK PAGE
router.get("/", (req, res) => {
    responseManager(req, res, responsesEnum.OK);
});

module.exports = router;