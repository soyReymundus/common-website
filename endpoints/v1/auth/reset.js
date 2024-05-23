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
    if (req.method != "PATH" && req.method != "POST") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.post("/", async (req, res) => {
    if (req.me != undefined) return responseManager(req, res, responsesEnum.ALREADY_AUTHENTICATED);
    let body = req.body;

    if (typeof body.email == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.email != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

    let user = await DBManager.find(DBTables.USERS, {
        "Email": body.email
    });

    if (user == null) return responseManager(req, res, responsesEnum.EMAIL_NOT_USED);
    if (user.Status != statusEnum.users.OK) return responseManager(req, res, responsesEnum.UNACCEPTABLE_ACCOUNT_STATUS);

    let code = jwt.sign({
        "ID": user.ID,
        "Type": statusEnum["codes"].RESET,
        "serie": user.EmailResets
    }, process.env["JWT_KEY"],
        { "expiresIn": "1h" }
    );

    responseManager(req, res, responsesEnum.OK, {
        "code": code
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

        let user = await DBManager.find(DBTables.USERS, {
            "UserID": code.ID
        });

        if (user == null) return responseManager(req, res, responsesEnum.INVALID_CODE);
        if (user.Password == hashedPassword) return responseManager(req, res, responsesEnum.SAME_PASSWORD);
        if (user.Status != statusEnum.users.OK) return responseManager(req, res, responsesEnum.UNACCEPTABLE_ACCOUNT_STATUS);

        await DBManager.findAndUpdate(DBTables.USERS, {
            "ID": user.ID
        }, {
            "PasswordResets": user.PasswordResets + 1,
            "Password": hashedPassword
        });

        responseManager(req, res, responsesEnum.OK);
    });
});

module.exports = router;