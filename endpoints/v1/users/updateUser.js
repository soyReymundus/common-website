const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { createHash } = require("crypto");
const parser = require('accept-language-parser');
const DBManager = require("../../../utils/DBManager.js");
const emailManager = require("../../../utils/emailManager.js");
const DBTables = require("../../../constants/DBTables.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.use((req, res, next) => {
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

    let hashedPassword = createHash('sha256').update(body.password + process.env["PASSWORD_SALT"]).digest('hex');

    if (req.user.Password != hashedPassword) return responseManager(req, res, responsesEnum.INCORRECT_PASSWORD);

    if (body.birthdate) {
        if (typeof body.birthdate != "number") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

        return responseManager(req, res, responsesEnum.UNAUTHORIZED);

        let now = new Date();
        let birthdate = new Date(body.birthdate);
        let difference = new Date(now - birthdate);
        let minimunAge = parseInt(process.env["MINIMUM_AGE"]);

        if (body.birthdate >= now.getTime()) return responseManager(req, res, responsesEnum.INVALID_BIRTHDATE);

        if ((difference.getFullYear() - 1970) < minimunAge) {
            let needTime = new Date()
            needTime.setFullYear(needTime.getFullYear() + minimunAge);

            DBManager.create(DBTables.USERS_PUNISHMENTS, {
                "LegalPunishment": false,
                "Ended": false,
                "Duration": needTime.getTime(),
                "Reason": "You are very young.",
                "UserID": req.user.ID
            });

            updates["Status"] = statusEnum.users.BANNED;
        };

        updates["BirthDate"] = body.birthdate;
    };

    if (body.language) {
        if (!/^[a-zA-Z0-9\-]+$/.test(body.language)) return responseManager(req, res, responsesEnum.INVALID_LANGUAGE);

        let languagesArray = parser.parse(body.language);

        if (languagesArray.length != 1) return responseManager(req, res, responsesEnum.INVALID_LANGUAGE);

        switch (languagesArray[0].code) {
            case "es":
                straightLanguage = regionValidor(
                    languagesArray[0].code,
                    languagesArray[0].region,
                    [undefined, "419", "ES"]
                );
                break;
            case "en":
                straightLanguage = regionValidor(
                    languagesArray[0].code,
                    languagesArray[0].region,
                    [undefined, "US"]
                );
                break;
            case "ja":
                straightLanguage = regionValidor(
                    languagesArray[0].code,
                    languagesArray[0].region,
                    [undefined, "JP"]
                );
                break;
            default:
                return responseManager(req, res, responsesEnum.NOT_AVAILABLE_LANGUAGE);
                break;
        };

        if (!straightLanguage) return responseManager(req, res, responsesEnum.NOT_AVAILABLE_LANGUAGE);

        updates["Language"] = straightLanguage;
    };

    if (body.username) {
        if (3 > body.username.length || !/^[a-zA-Z0-9_\.]+$/.test(body.username) || 32 < body.username.length) return responseManager(req, res, responsesEnum.INVALID_USERNAME);

        let usernameChecker = await DBManager.find(DBTables.USERS, {
            "Username": body.username
        });

        if (usernameChecker != null) return responseManager(req, res, responsesEnum.USERNAME_USED);

        updates["Username"] = body.username;
    };

    if (body.newPassword) {
        if (6 > body.newPassword.length || 64 < body.newPassword.length) return responseManager(req, res, responsesEnum.INVALID_PASSWORD);

        let hashedNewPassword = createHash('sha256').update(body.newPassword + process.env["PASSWORD_SALT"]).digest('hex');

        if (hashedPassword == hashedNewPassword) return responseManager(req, res, responsesEnum.SAME_PASSWORD);

        req.user.PasswordResets = req.user.PasswordResets + 1;

        updates["PasswordResets"] = req.user.PasswordResets;
        updates["Password"] = hashedNewPassword;
    };

    if (body.email) {
        if (body.email.length > 320 || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email)) return responseManager(req, res, responsesEnum.INVALID_EMAIL);

        let emailChecker = await DBManager.find(DBTables.USERS, {
            "Email": body.email
        });

        if (emailChecker != null) return responseManager(req, res, responsesEnum.EMAIL_USED);

        req.user.EmailResets = req.user.EmailResets + 1;

        updates["Status"] = statusEnum.users.NEED_ACTIONS;
        updates["EmailResets"] = req.user.EmailResets;
        updates["Email"] = body.email;

        let code = jwt.sign({
            "ID": req.user.ID,
            "Type": statusEnum["codes"].EMAIL,
            "serie": req.user.PasswordResets,
            "serie2": req.user.EmailResets
        }, process.env["JWT_KEY"]);

        emailManager.send(body.email, req.headers["accept-language"], emailResponses["EMAIL_CHANGED"], {
            "CODE": code,
            "WEBSITE": process.env["FRONTEND_SITE"]
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

    if (Object.keys(updates) == 0) return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);

    await DBManager.findAndUpdate(DBTables.USERS, {
        "ID": req.user.ID
    }, updates);

    responseManager(req, res, responsesEnum.PROFILE_SUCCESSFULLY_UPDATED);
});

module.exports = router;

/**
 * 
 * @param {string} region
 * @param {string[]} regions 
 * @returns 
 */
function regionValidor(language, region, regions) {
    if (regions.includes(region)) {
        if (!region) return language;

        return `${language}-${region}`;
    } else {
        return;
    };
};