const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const DBManager = require("../../../../utils/DBManager.js");
const extractInfo = require("../../../../utils/extractInfo.js");
const emailManager = require("../../../../utils/emailManager.js");
const DBModels = require("../../../../constants/DBModels.js");
const statusEnum = require("../../../../constants/statusEnum.js");
const checkUserStatus = require("../../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../../constants/responsesEnum.js");
const responseManager = require("../../../../utils/responseManager.js");
const emailResponses = require("../../../../constants/emailResponses.js");

router.get("/", async (req, res) => {
    responseManager(req, res, responsesEnum.MESSAGE_SUCCESSFULLY_RETRIEVED, {
        chat: await extractInfo.message(req.message)
    });
});

module.exports = router;