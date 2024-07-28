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
const captcha = new Map();

router.use(async (req, res, next) => {
    if (!req.configPath) return next();
    if (req.config["captcha"]["disable"]) return next();

    let key = req.configPath + req.method + req.ip;
    let body = req.body;
    let recaptchaToken;

    if (req.me) key = req.configPath + req.method + req.me.ID;

    let limit = checkLimits(captcha, key, req.config["captcha"]);

    if (limit.expiresIn == null) return next();

    if (
        req.method != "POST" &&
        req.method != "PUT" &&
        req.method != "PATCH"
    ) {
        if (!req.query["recaptchaToken"]) return responseManager(req, res, responsesEnum.CAPTCHA_REQUIRED);

        recaptchaToken = req.query["recaptchaToken"];
    } else {
        if (typeof body.recaptchaToken == "undefined") return responseManager(req, res, responsesEnum.CAPTCHA_REQUIRED);
        if (typeof body.recaptchaToken != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

        recaptchaToken = body.recaptchaToken;
    };

    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env["RECAPTCHA_SECRET_KEY"]}&response=${recaptchaToken}`, {
        "signal": AbortSignal.timeout(15000)
    })
        .then((f) => {
            return f.json()
        })
        .then((response) => {
            if (response.success) return next();

            if (response["error-codes"].includes("invalid-input-response") || response["error-codes"].includes("missing-input-response")) return responseManager(req, res, responsesEnum.CAPTCHA_FAILED);
            if (response["error-codes"].includes("timeout-or-duplicate")) return responseManager(req, res, responsesEnum.reCAPTCHA_TIMEOUT_FAILED);

            return responseManager(req, res, responsesEnum.reCAPTCHA_MISCONFIGURED);
        })
        .catch((e) => {
            if (e.message.includes("timeout")) return responseManager(req, res, responsesEnum.reCAPTCHA_TIMEOUT);
            if (e.message.includes("is not valid JSON")) return responseManager(req, res, responsesEnum.reCAPTCHA_INVALID_RESPOND);

            return responseManager(req, res, responsesEnum.reCAPTCHA_CONNECTION_ERROR);
        });
});

module.exports = router;