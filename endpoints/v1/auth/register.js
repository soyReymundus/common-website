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
    if (req.method != "POST") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.post("/", async (req, res) => {
    if (req.me != undefined) return responseManager(req, res, responsesEnum.ALREADY_AUTHENTICATED);
    let body = req.body;

    if (typeof body.birthdate == "undefined" || typeof body.email == "undefined" || typeof body.username == "undefined" || typeof body.password == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.birthdate != "number" || typeof body.email != "string" || typeof body.username != "string" || typeof body.password != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

    if ((new Date(new Date() - new Date(body.birthdate)).getFullYear() - 1970) < parseInt(process.env["MINIMUM_AGE"])) return responseManager(req, res, responsesEnum.NOT_OLD_ENOUGH);
    if (2 > body.username.length || !/^[a-zA-Z0-9_\.]+$/.test(body.username) || 32 < body.username.length) return responseManager(req, res, responsesEnum.INVALID_USERNAME);
    if (2 > body.password.length || 64 < body.password.length) return responseManager(req, res, responsesEnum.INVALID_PASSWORD);
    if (body.email.length > 320 || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email)) return responseManager(req, res, responsesEnum.INVALID_EMAIL);

    let emailChecker = await DBManager.find(DBTables.USERS, {
        "Email": body.email
    });

    if (emailChecker != null) return responseManager(req, res, responsesEnum.EMAIL_USED);

    let usernameChecker = await DBManager.find(DBTables.USERS, {
        "Username": body.username
    });

    if (usernameChecker != null) return responseManager(req, res, responsesEnum.USERNAME_USED);

    let hashedPassword = createHash('sha256').update(body.password + process.env["PASSWORD_SALT"]).digest('hex');

    await DBManager.create(DBTables.USERS, {
        "Username": body.username,
        "Password": hashedPassword,
        "BirthDate": body.birthdate,
        "Email": body.email
    });

    responseManager(req, res, responsesEnum.EMAIL_VERIFICATION_REQUIRED);

    let user = await DBManager.find(DBTables.USERS, {
        "Username": body.username
    });

    let code = jwt.sign({
        "ID": user.ID,
        "Type": statusEnum["codes"].EMAIL,
        "serie": user.EmailResets
    }, process.env["JWT_KEY"]);

    EmailSender.send({
        "to": body.email,
        "from": emailResponses.REGISTER.from,
        "subject": emailResponses.REGISTER.subject,
        "html": emailResponses.REGISTER.html.replace(/\%CODE\%/, code)
    });
});

module.exports = router;