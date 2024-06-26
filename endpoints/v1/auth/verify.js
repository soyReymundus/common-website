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
    if (req.method != "PATH") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.patch("/", async (req, res) => {
    if (req.me != undefined) return responseManager(req, res, responsesEnum.ALREADY_AUTHENTICATED);
    let body = req.body;

    if (typeof body.code == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.code != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

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

        if (code["Type"] != statusEnum["codes"].EMAIL) return responseManager(req, res, responsesEnum.INVALID_CODE);

        let user = await DBManager.find(DBTables.USERS, {
            "UserID": code.ID
        });

        if (user == null) return responseManager(req, res, responsesEnum.INVALID_CODE);
        if (code["serie"] != user.EmailResets) return responseManager(req, res, responsesEnum.INVALID_CODE);
        if (user.Status != statusEnum.users.NEED_ACTIONS) return responseManager(req, res, responsesEnum.INVALID_CODE);

        await DBManager.findAndUpdate(DBTables.USERS, {
            "ID": user.ID
        }, {
            "Status": statusEnum.users.OK,
            "EmailResets": user.EmailResets + 1
        });

        responseManager(req, res, responsesEnum.OK);
    });
});

module.exports = router;