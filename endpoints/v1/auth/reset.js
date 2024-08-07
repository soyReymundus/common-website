const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const emailManager = require("../../../utils/emailManager.js");
const DBModels = require("../../../constants/DBModels.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.use((req, res, next) => {
    if (req.method != "PATCH" && req.method != "POST") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.post("/", async (req, res) => {
    if (req.me != undefined) return responseManager(req, res, responsesEnum.ALREADY_AUTHENTICATED);
    let body = req.body;

    if (typeof body.email == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.email != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

    let user = await DBModels.users.findOne({
        "where": {
            "Email": body.email
        }
    });

    if (user == null) return responseManager(req, res, responsesEnum.EMAIL_NOT_USED);
    if (user.Status != statusEnum.users.OK) return responseManager(req, res, responsesEnum.UNACCEPTABLE_ACCOUNT_STATUS);

    let code = jwt.sign({
        "ID": user.ID,
        "Type": statusEnum["codes"].RESET,
        "serie": user.PasswordResets,
        "serie2": user.EmailResets
    }, process.env["JWT_KEY"],
        { "expiresIn": "1h" }
    );

    responseManager(req, res, responsesEnum.CODE_SUCCESSFULLY_SENT);

    emailManager.send(body.email, req.headers["accept-language"], emailResponses["PASSWORD_RESET"], {
        "CODE": code,
        "WEBSITE": process.env["FRONTEND_SITE"]
    });
});

router.patch("/", async (req, res) => {
    if (req.me != undefined) return responseManager(req, res, responsesEnum.ALREADY_AUTHENTICATED);
    let body = req.body;

    if (typeof body.code == "undefined" || typeof body.password == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.code != "string" || typeof body.password != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

    if (2 > body.password.length || 64 < body.password.length) return responseManager(req, res, responsesEnum.INVALID_PASSWORD);
    let hashedPassword = createHash('sha256').update(body.password + process.env["PASSWORD_SALT"]).digest('hex');

    jwt.verify(body.code, process.env["JWT_KEY"], async (err, code) => {
        if (err) {
            switch (err.name) {
                case "NotBeforeError":
                    return responseManager(req, res, responsesEnum.INVALID_NBF_CODE, {
                        "before": (new Date(err.date)).getTime()
                    });
                    break;
                case "TokenExpiredError":
                    return responseManager(req, res, responsesEnum.EXPIRED_CODE);
                    break;
                case "JsonWebTokenError":
                    return responseManager(req, res, responsesEnum.INVALID_CODE);
                    break;
                default:
                    return responseManager(req, res, responsesEnum.INVALID_CODE);
                    break;
            }
        };

        if (code["Type"] != statusEnum["codes"].RESET) return responseManager(req, res, responsesEnum.INVALID_CODE);

        let user = await DBModels.users.findOne({
            "where": {
                "ID": code.ID
            }
        });

        if (user == null) return responseManager(req, res, responsesEnum.INVALID_CODE);
        
        if (user.PasswordResets != code["serie"]) return responseManager(req, res, responsesEnum.INVALID_CODE);
        if (user.EmailResets != code["serie1"]) return responseManager(req, res, responsesEnum.INVALID_CODE);

        if (user.Password == hashedPassword) return responseManager(req, res, responsesEnum.SAME_PASSWORD);
        if (user.Status != statusEnum.users.OK) return responseManager(req, res, responsesEnum.UNACCEPTABLE_ACCOUNT_STATUS);

        user.PasswordResets = user.PasswordResets + 1;
        user.Password = hashedPassword;
        await user.save();

        responseManager(req, res, responsesEnum.PASSWORD_RESET_SUCCESSFULLY);
    });
});

module.exports = router;