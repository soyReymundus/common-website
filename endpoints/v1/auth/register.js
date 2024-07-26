const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const parser = require('accept-language-parser');
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
    let language = process.serverConfig["defaultLanguage"];

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

    if (req.headers["accept-language"]) {
        let languages = parser.parse(req.headers["accept-language"]);

        for (let index = 0; index < languages.length; index++) {
            const l = languages[index];

            let matchedLanguage = process.serverConfig["languages"].find(lang => lang.code === l.code);

            if (matchedLanguage) {
                if (matchedLanguage.regions.includes(l.region)) {
                    language = `${l.code}-${l.region}`;
                } else {
                    language = l.code;
                };
                break;
            };
        };
    };

    let user = await DBModels.users.create({
        "Email": body.email,
        "Username": body.username,
        "Password": hashedPassword,
        "BirthDate": body.birthdate,
        "Language": language,
        "CreationDate": Date.now(),
        "UsernameCoolDown": UsernameCoolDown.getTime(),
        "ContractID": process.serverConfig["actualToS"]
    });

    responseManager(req, res, responsesEnum.EMAIL_VERIFICATION_REQUIRED);

    DBModels.notificationsInbox.create({
        "UserID": user.ID,
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