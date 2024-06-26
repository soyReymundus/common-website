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
    if (req.method != "PATCH") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.patch("/", async (req, res) => {
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    if (req.me.ID != req.user.ID) return responseManager(req, res, responsesEnum.UNAUTHORIZED);
    let body = req.body;
    let updates = {};

    if (typeof body.password == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.password != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

    if (Object.keys(body) == 1) return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);

    let hashedPassword = createHash('sha256').update(body.password + process.env["PASSWORD_SALT"]).digest('hex');

    if (req.me.Password != hashedPassword) return responseManager(req, res, responsesEnum.INCORRECT_PASSWORD);

    if (body.birthdate){
        if (typeof body.birthdate != "number") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

        return responseManager(req, res, responsesEnum.UNAUTHORIZED);

        let now = new Date();
        let birthdate = new Date(body.birthdate);
    
        if ((new Date(now - birthdate).getFullYear() - 1970) < parseInt(process.env["MINIMUM_AGE"])) {
            let difference = now - birthdate;

            DBManager.create(DBTables.USERS_PUNISHMENTS, {
                "LegalPunishment": false,
                "Ended": false,
                "Duration": difference,
                "Reason": "You are very young.",
                "UserID": req.me.ID
            });

            updates["Status"] = statusEnum.users.BANNED;
        };

        updates["BirthDate"] = body.birthdate;
    };

    if (body.username) {
        if (2 > body.username.length || !/^[a-zA-Z0-9_\.]+$/.test(body.username) || 32 < body.username.length) return responseManager(req, res, responsesEnum.INVALID_USERNAME);

        let usernameChecker = await DBManager.find(DBTables.USERS, {
            "Username": body.username
        });
    
        if (usernameChecker != null) return responseManager(req, res, responsesEnum.USERNAME_USED);
    
        updates["Username"] = body.username;
    };

    if (body.newPassword) {
        if (2 > body.newPassword.length || 64 < body.newPassword.length) return responseManager(req, res, responsesEnum.INVALID_PASSWORD);
        
        updates["PasswordResets"] = req.user.PasswordResets + 1;
        updates["Password"] = body.newPassword;
    };
    
    if (body.email) {
        if (body.email.length > 320 || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email)) return responseManager(req, res, responsesEnum.INVALID_EMAIL);

        let emailChecker = await DBManager.find(DBTables.USERS, {
            "Email": body.email
        });
    
        if (emailChecker != null) return responseManager(req, res, responsesEnum.EMAIL_USED);    
        
        updates["Status"] = statusEnum.users.NEED_ACTIONS;
        updates["EmailResets"] = req.user.EmailResets + 1;
        updates["Email"] = body.email;

        let code = jwt.sign({
            "ID": req.me.ID,
            "Type": statusEnum["codes"].EMAIL,
            "serie": req.me.EmailResets
        }, process.env["JWT_KEY"]);
    
        EmailSender.send({
            "to": body.email,
            "from": emailResponses["EMAIL_CHANGED"].from,
            "subject": emailResponses["EMAIL_CHANGED"].subject,
            "html": emailResponses["EMAIL_CHANGED"].html.replace(/\%CODE\%/, code)
        });
    };
    
    if (body.displayName) {
        if (2 > body.displayName.length || 32 < body.displayName.length) return responseManager(req, res, responsesEnum.INVALID_DISPLAYNAME);

        updates["DisplayName"] = body.displayName;
    };

    if (body.description) {
        if (2000 < body.description.length) return responseManager(req, res, responsesEnum.INVALID_DESCRIPTION);

        updates["Description"] = body.description;
    };

    if (body.lastName) {
        if (255 < body.lastName.length) return responseManager(req, res, responsesEnum.INVALID_LASTNAME);

        updates["LastName"] = body.lastName;
    };

    if (body.firstName) {
        if (255 < body.firstName.length) return responseManager(req, res, responsesEnum.INVALID_FIRSTNAME);

        updates["FirstName"] = body.firstName;
    };
    
    if (body.photo) {
        if (body.photo) {
            //coming soon
        };

        updates["Photo"] = body.photo;
    };

    if (body.banner) {
        if (body.banner) {
            //coming soon
        };

        updates["Banner"] = body.banner;
    };

    await DBManager.findAndUpdate(DBTables.USERS, {
        "ID": req.me.ID
    }, updates);
    
    responseManager(req, res, responsesEnum.EMAIL_VERIFICATION_REQUIRED);
});

module.exports = router;