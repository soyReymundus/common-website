const { Router, json } = require("express");
const jwt = require('jsonwebtoken');
const DBManager = require("../../utils/DBManager.js");
const DBModels = require("../../constants/DBModels.js");
const checkLimits = require("../../utils/checkLimits.js");
const statusEnum = require("../../constants/statusEnum.js");
const checkUserStatus = require("../../utils/checkUserStatus.js");
const responseManager = require("../../utils/responseManager.js");
const responsesEnum = require("../../constants/responsesEnum.js");
const router = Router();
const ratelimit = new Map();

router.use(async (req, res, next) => {
    if (!req.configPath) return next();
    if (req.config["ratelimit"]["disable"]) return next();

    let key = req.configPath + req.method + req.ip;
    
    if (req.me) key = req.configPath + req.method + req.me.ID;
    
    let limit = checkLimits(ratelimit, key, req.config["ratelimit"]);

    if (limit.expiresIn == null) return next();

    let expiresInSec = Math.round((limit.expiresIn - Date.now()) / 1000);

    res.setHeader("Retry-After", expiresInSec);
    return responseManager(req, res, responsesEnum.RATE_LIMIT);
});

module.exports = router;