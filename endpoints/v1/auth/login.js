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
    if (req.method != "POST") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.post("/", async (req, res) => {
    if (req.me != undefined) return responseManager(req, res, responsesEnum.ALREADY_AUTHENTICATED);
    let body = req.body;

    if (typeof body.username == "undefined" || typeof body.password == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.username != "string" || typeof body.password != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

    let hashedPassword = createHash('sha256').update(body.password + process.env["PASSWORD_SALT"]).digest('hex');

    let user = await DBModels.users.findOne({
        "where": {
            "Username": body.username,
            "Password": hashedPassword
        }
    });

    if (user == null) return responseManager(req, res, responsesEnum.INVALID_USERNAME_OR_PASSWORD);

    let userCheck = await checkUserStatus(req, res, user);

    if (!userCheck) return;

    let token = jwt.sign({
        "ID": user.ID,
        "serie": user.PasswordResets,
        "serie2": user.EmailResets
    }, process.env["JWT_KEY"]);

    if (!user.DeletionDate) {
        responseManager(req, res, responsesEnum.YOU_HAVE_SUCCESSFULLY_LOGIN, {
            token
        });
    } else {
        if (typeof body.cancelDeletion == "undefined") return responseManager(req, res, responsesEnum.NOT_RECOVER_PARAM);
        if (typeof body.cancelDeletion != "boolean") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

        if (body.cancelDeletion) {
            user.DeletionDate = null;
            await user.save();

            responseManager(req, res, responsesEnum.LOGIN_AND_CANCELED_SCHEDULED_DELETION, {
                token
            });
        } else {
            return responseManager(req, res, responsesEnum.SCHEDULED_DELETION);
        };
    };
});

module.exports = router;