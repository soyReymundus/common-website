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
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    if (req.me.ID != req.post.UserID) return responseManager(req, res, responsesEnum.UNAUTHORIZED);

    let offset = 0;

    if (req.query["offset"]) {
        offset = parseInt(req.query["offset"]);

        if (isNaN(offset)) offset = 0;
    };

    return responseManager(req, res, responsesEnum.POST_OPINIONS_SUCCESSFULLY_RETRIEVED, {
        opinions: extractInfo.postOpinions(post, offset)
    });
});

module.exports = router;