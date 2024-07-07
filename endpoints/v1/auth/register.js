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

    if (typeof body.birthdate == "undefined" || typeof body.email == "undefined" || typeof body.username == "undefined" || typeof body.password == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.birthdate != "number" || typeof body.email != "string" || typeof body.username != "string" || typeof body.password != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

    if (body.birthdate >= Date.now()) return responseManager(req, res, responsesEnum.INVALID_BIRTHDATE);
    if ((new Date(new Date() - new Date(body.birthdate)).getFullYear() - 1970) < parseInt(process.serverConfig["legalMinimunAge"])) return responseManager(req, res, responsesEnum.NOT_LEGAL_MINIMUM_AGE, { "legalMinimumAge": parseInt(process.serverConfig["legalMinimunAge"]) });
    if ((new Date(new Date() - new Date(body.birthdate)).getFullYear() - 1970) < parseInt(process.serverConfig["minimunAge"])) return responseManager(req, res, responsesEnum.NOT_OLD_ENOUGH, { "minimumAge": parseInt(process.serverConfig["minimunAge"]) });
    if (3 > body.username.length || !/^[a-zA-Z0-9_\.]+$/.test(body.username) || 32 < body.username.length) return responseManager(req, res, responsesEnum.INVALID_USERNAME);
    if (6 > body.password.length || 64 < body.password.length) return responseManager(req, res, responsesEnum.INVALID_PASSWORD);
    if (body.email.length > 320 || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email)) return responseManager(req, res, responsesEnum.INVALID_EMAIL);

    let emailChecker = await DBModels.users.findOne({
        "where": {
            "Email": body.email
        }
    });

    if (emailChecker != null) return responseManager(req, res, responsesEnum.EMAIL_USED);

    let usernameChecker = await DBModels.users.findOne({
        "where": {
            "Username": body.username
        }
    });

    if (usernameChecker != null) return responseManager(req, res, responsesEnum.USERNAME_USED);

    let hashedPassword = createHash('sha256').update(body.password + process.env["PASSWORD_SALT"]).digest('hex');
    let date = new Date();
    let UsernameCoolDown = new Date(date.setMonth(date.getMonth() + 1));

    await DBModels.users.create({
        "Email": body.email,
        "Username": body.username,
        "Password": hashedPassword,
        "BirthDate": body.birthdate,
        "UsernameCoolDown": UsernameCoolDown.getTime(),
        "ContractID": process.serverConfig["actualToS"]
    });

    responseManager(req, res, responsesEnum.EMAIL_VERIFICATION_REQUIRED);

    let user = await DBModels.users.findOne({
        "where": {
            "Username": body.username
        }
    });

    let code = jwt.sign({
        "ID": user.ID,
        "Type": statusEnum["codes"].EMAIL,
        "serie": user.PasswordResets,
        "serie2": user.EmailResets
    }, process.env["JWT_KEY"]);

    emailManager.send(body.email, req.headers["accept-language"], emailResponses["REGISTER"], {
        "CODE": code,
        "WEBSITE": process.env["FRONTEND_SITE"]
    });
});

module.exports = router;