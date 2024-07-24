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

router.param('message', async (req, res, next, message) => {
    if (isNaN(parseInt(message))) return responseManager(req, res, responsesEnum.CHAT_NOT_FOUND);

    let m = await DBModels.messages.findOne({
        "where": {
            "ID": message,
            "ChatID": req.chat["ID"]
        }
    });

    if (m == null) return responseManager(req, res, responsesEnum.CHAT_NOT_FOUND);

    req.message = m;
    next();
});

router.use("/:message", require("./messageHandler.js"));
router.use("/", require("./messagesHandler.js"));

//BLANK PAGE
router.get("/", (req, res) => {
    responseManager(req, res, responsesEnum.OK);
});

module.exports = router;