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
    if (req.method != "GET") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.get("/", async (req, res) => {
    let user = {
        "ID": req.user["ID"],
        "username": req.user["Username"],
        "displayName": req.user["DisplayName"],
        "photo": req.user["Photo"],
        "banner": req.user["Banner"],
        "description": req.user["Description"],
        "permissions": req.user["Permissions"],
        "birthDate": req.user["BirthDate"],
        "firstName": req.user["FirstName"],
        "lastName": req.user["LastName"]
    };

    if (req.me.ID == req.user.ID) {
        user["email"] = req.user["Email"];
    };

    if (req.me.Permissions == statusEnum.usersPermissions.ADMINISTRATOR) {
        user["email"] = req.user["Email"];
    };

    responseManager(req, res, responsesEnum.OK, {
        user
    });
});

module.exports = router;